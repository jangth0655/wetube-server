import express, { NextFunction, Request, Response } from "express";
import { join, login } from "../controllers/userController";
import { search, home } from "../controllers/videoController";
import { publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.post("/join", publicOnlyMiddleware, join);
rootRouter.post("/login", publicOnlyMiddleware, login);
rootRouter.get("/search", search);

export default rootRouter;
