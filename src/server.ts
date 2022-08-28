import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

/* app.use("/*", (req: Request, res: Response, next: NextFunction) => {
  console.log("error");
  return res.status(404).json({ ok: false, error: "Not found" });
}); */

export default app;
