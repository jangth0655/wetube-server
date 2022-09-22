import express from "express";
import {
  deleteVideo,
  edit,
  watch,
  upload,
  createComment,
  deleteComment,
  awsVideoUpload,
  search,
  increaseView,
} from "../controllers/videoController";
import { protectorMiddleware, videoUploadFn } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);

videoRouter.post("/:id([0-9a-f]{24})/delete", protectorMiddleware, deleteVideo);

videoRouter.post("/:id([0-9a-f]{24})/edit", protectorMiddleware, edit);
videoRouter.post(
  "/:id([0-9a-f]{24})/comment",
  protectorMiddleware,
  createComment
);

videoRouter.post("/:id([0-9a-f]{24})/view", increaseView);

videoRouter.post(
  "/:id([0-9a-f]{24})/delete-comment",
  protectorMiddleware,
  deleteComment
);

videoRouter.post("/upload", protectorMiddleware, upload);
videoRouter.post(
  "/awsUpload",
  protectorMiddleware,
  videoUploadFn,
  awsVideoUpload
);
videoRouter.post("/search/:keyword", search);

export default videoRouter;
