import { NextFunction, Request, Response } from "express";
import Video from "../models/Video";

export const home = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const videos = await Video.find({});
    return res.json({ ok: true, videos });
  } catch (error) {
    return res.status(404).json({ ok: false, error });
  }
};

export const see = (req: Request, res: Response, next: NextFunction) => {
  return res.send(`watch ${req.params.id} #`);
};

export const upload = (req: Request, res: Response, next: NextFunction) => {
  return res.send("upload");
};

export const deleteVideo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("delete video");
};

export const edit = (req: Request, res: Response, next: NextFunction) => {
  return res.send("edit video");
};

export const search = (req: Request, res: Response, next: NextFunction) => {
  res.send("send");
};
