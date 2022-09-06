import { NextFunction, Request, Response } from "express";

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

export const checkSocialLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.user?.socialOnly) {
    return res.json({ ok: false, socialOnly: req.session.user?.socialOnly });
  }
  return next();
};
