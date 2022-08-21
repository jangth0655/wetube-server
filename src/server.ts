import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

app.use("/*", (req: Request, res: Response, next: NextFunction) => {
  console.log("error");
  return res.status(404).json({ ok: false, error: "Not found" });
});

export default app;
