import { NextFunction, Request, Response } from "express";

export const join = (req: Request, res: Response, next: NextFunction) => {};

export const login = (req: Request, res: Response, next: NextFunction) => {
  res.send("login");
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.send("logout");
};

export const see = (req: Request, res: Response, next: NextFunction) => {
  res.send("see user");
};

export const edit = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params);

  res.send("Edit user");
};

export const remove = (req: Request, res: Response, next: NextFunction) => {
  res.send("Delete user");
};
