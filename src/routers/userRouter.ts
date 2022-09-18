import express from "express";
import {
  awsAvatarUpload,
  changePassword,
  edit,
  me,
  remove,
  see,
} from "../controllers/userController";
import {
  imageUpload,
  protectorMiddleware,
  publicOnlyMiddleware,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/me", protectorMiddleware, me);
userRouter.post("/awsUpload", imageUpload, awsAvatarUpload);
userRouter.post("/:id/edit", protectorMiddleware, edit);
userRouter.post("/:id/change-password", protectorMiddleware, changePassword);
userRouter.get("/:id/delete", protectorMiddleware, remove);
userRouter.get("/:id/", publicOnlyMiddleware, see);

export default userRouter;
