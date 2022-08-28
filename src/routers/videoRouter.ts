import express from "express";
import {
  deleteVideo,
  edit,
  watch,
  upload,
} from "../controllers/videoController";
import { protectorMiddleware } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);

videoRouter.post("/:id([0-9a-f]{24})/delete", protectorMiddleware, deleteVideo);
videoRouter.post("/:id([0-9a-f]{24})/edit", protectorMiddleware, edit);
videoRouter.post("/upload", protectorMiddleware, upload);

export default videoRouter;
