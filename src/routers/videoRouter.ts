import express from "express";
import {
  deleteVideo,
  edit,
  watch,
  upload,
  createComment,
  deleteComment,
  awsVideoUpload,
} from "../controllers/videoController";
import { protectorMiddleware, videoUpload } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);

videoRouter.post("/:id([0-9a-f]{24})/delete", protectorMiddleware, deleteVideo);

videoRouter.post("/:id([0-9a-f]{24})/edit", protectorMiddleware, edit);
videoRouter.post(
  "/:id([0-9a-f]{24})/comment",
  protectorMiddleware,
  createComment
);

videoRouter.post("/:id([0-9a-f]{24})", protectorMiddleware, deleteComment);
videoRouter.post("/upload", upload);
videoRouter.post("/awsUpload", videoUpload, awsVideoUpload);

export default videoRouter;
