import { NextFunction, Request, Response } from "express";

export const protectorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.session.loggedIn) {
      next();
    } else {
      return res.status(401).json({ ok: false, error: "Please Login" });
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
