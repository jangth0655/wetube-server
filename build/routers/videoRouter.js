"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var videoController_1 = require("../controllers/videoController");
var middlewares_1 = require("../middlewares");
var videoRouter = express_1.default.Router();
videoRouter.get("/:id([0-9a-f]{24})", videoController_1.watch);
videoRouter.post("/:id([0-9a-f]{24})/delete", middlewares_1.protectorMiddleware, videoController_1.deleteVideo);
videoRouter.post("/:id([0-9a-f]{24})/edit", middlewares_1.protectorMiddleware, videoController_1.edit);
videoRouter.post("/:id([0-9a-f]{24})/comment", middlewares_1.protectorMiddleware, videoController_1.createComment);
videoRouter.post("/:id([0-9a-f]{24})/view", videoController_1.increaseView);
videoRouter.post("/:id([0-9a-f]{24})/delete-comment", middlewares_1.protectorMiddleware, videoController_1.deleteComment);
videoRouter.post("/upload", videoController_1.upload);
videoRouter.post("/awsUpload", middlewares_1.videoUploadFn, videoController_1.awsVideoUpload);
videoRouter.post("/search/:keyword", videoController_1.search);
exports.default = videoRouter;
