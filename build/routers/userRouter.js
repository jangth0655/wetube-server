"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = require("../controllers/userController");
var middlewares_1 = require("../middlewares");
var userRouter = express_1.default.Router();
userRouter.get("/me", middlewares_1.protectorMiddleware, userController_1.me);
userRouter.post("/awsUpload", middlewares_1.imageUploadFn, userController_1.awsAvatarUpload);
userRouter.post("/:id/edit", middlewares_1.protectorMiddleware, userController_1.edit);
userRouter.post("/:id/change-password", middlewares_1.protectorMiddleware, userController_1.changePassword);
userRouter.get("/:id/delete", middlewares_1.protectorMiddleware, userController_1.remove);
userRouter.get("/:id/", middlewares_1.publicOnlyMiddleware, userController_1.see);
exports.default = userRouter;
