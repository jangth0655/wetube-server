import express from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";

import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

app.use(cookieParser());

const corsOptions = {
  credentials: true,
  origin: process.env.CLIENT_URL,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.COOKIE_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL! }),
    cookie: {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 8.64e7,
      secure: process.env.NODE_ENV === "production",
    },
  })
);

app.use(function (req, res, next) {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

/* app.use("/*", (req: Request, res: Response, next: NextFunction) => {
  console.log("error");
  return res.status(404).json({ ok: false, error: "Not found" });
}); */

export default app;
