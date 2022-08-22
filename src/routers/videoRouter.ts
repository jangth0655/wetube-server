import express from "express";
import {
  deleteVideo,
  edit,
  watch,
  upload,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);

videoRouter.post("/:id([0-9a-f]{24})/delete", deleteVideo);
videoRouter.post("/:id([0-9a-f]{24})/edit", edit);
videoRouter.post("/upload", upload);

export default videoRouter;
