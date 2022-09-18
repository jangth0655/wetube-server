import { NextFunction, Request, Response } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

export const protectorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.session.loggedIn && req.session.user) {
      next();
    } else {
      return res.json({ ok: false, error: "Please Login" });
    }
  } catch (e) {
    return res.status(500).json({ ok: false, error: `Server Error : ${e}.` });
  }
};

export const publicOnlyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.loggedIn) {
    return next();
  }
};

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ID!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
  region: process.env.AWS_REGION,
});

const multerUpload = multerS3({
  s3,
  bucket: "wetube-upload",
  key: function (req, file, cb) {
    let uniqFileName = `upload/${file.mimetype.split("/")[0]}_${
      req.session.user.username
    }_${Date.now()}.*`;
    cb(null, uniqFileName);
  },
  acl: "public-read",
});

export const imageUpload = multer({
  storage: multerUpload,
  limits: {
    fileSize: 10000000,
  },
}).single("file");

export const videoUpload = multer({
  storage: multerUpload,
  limits: {
    fileSize: 10000000,
  },
}).single("file");
