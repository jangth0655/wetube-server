import express from "express";
import {
  changePassword,
  edit,
  finishGithubLogin,
  remove,
  see,
  startGithubLogin,
} from "../controllers/userController";
import {
  checkSocialLogin,
  protectorMiddleware,
  publicOnlyMiddleware,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.post("/:id/edit", protectorMiddleware, edit);
userRouter.post(
  "/:id/edit/change-password",
  protectorMiddleware,
  checkSocialLogin,
  changePassword
);
userRouter.get("/:id/delete", protectorMiddleware, remove);
userRouter.get("/:id/", see);

export default userRouter;
