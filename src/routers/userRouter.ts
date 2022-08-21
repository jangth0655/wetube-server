import express, { NextFunction, Request, Response } from "express";
import { edit, logout, remove, see } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/:id/edit", edit);
userRouter.get("/:id/delete", remove);
userRouter.get("/:id", see);

export default userRouter;
