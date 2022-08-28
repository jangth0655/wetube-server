import express, { NextFunction, Request, Response } from "express";
import {
  edit,
  finishGithubLogin,
  logout,
  remove,
  see,
  startGithubLogin,
} from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.post("/:id/edit", protectorMiddleware, edit);
userRouter.get("/:id/delete", protectorMiddleware, remove);
userRouter.get("/:id", see);

export default userRouter;
