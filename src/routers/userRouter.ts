import express from "express";
import {
  changePassword,
  edit,
  me,
  remove,
  see,
} from "../controllers/userController";
import {
  checkSocialLogin,
  protectorMiddleware,
  publicOnlyMiddleware,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/me", protectorMiddleware, me);
userRouter.post("/:id/edit", protectorMiddleware, edit);
userRouter.post(
  "/:id/edit/change-password",
  protectorMiddleware,
  checkSocialLogin,
  changePassword
);
userRouter.get("/:id/delete", protectorMiddleware, remove);
userRouter.get("/:id/", publicOnlyMiddleware, see);

export default userRouter;
