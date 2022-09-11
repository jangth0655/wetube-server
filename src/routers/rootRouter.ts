import express from "express";
import { join, login, logout } from "../controllers/userController";
import { search, home } from "../controllers/videoController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.post("/join", publicOnlyMiddleware, join);
rootRouter.post("/login", publicOnlyMiddleware, login);
rootRouter.post("/logout", protectorMiddleware, logout);
rootRouter.get("/search", search);
rootRouter.get("/cloudFlareUpload");

export default rootRouter;
