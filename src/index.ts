import mongoSanitize from "express-mongo-sanitize";
import connect from "./db";
import cors from "cors";
import express, { Express } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from "./routes/user.routes";
import videoRouter from "./routes/video.routes";
import viewRouter from "./routes/view.routes";
import subscribeRouter from "./routes/subscribe.routes";
import commentRouter from "./routes/comment.routes";
import likeRouter from "./routes/like.routes";
const app: Express = express();
const PORT = process.env.PORT || 5000;

require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(mongoSanitize());
app.use(
  cors({
    origin: ["https://marutube.shop", "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

const store = new MongoStore({
  mongoUrl: process.env.mongoURI as string,
  touchAfter: 24 * 60 * 60,
});

app.use(
  session({
    name: (process.env.COOKIE_NAME as string) || "session",
    secret: (process.env.COOKIE_SECRET as string) || "secret",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    store,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: true,
      sameSite: "none",
      domain: "marutube.shop",
    },
  })
);

app.use("/api/user", userRouter);
app.use("/api/video", videoRouter);
app.use("/api/view", viewRouter);
app.use("/api/subscribe", subscribeRouter);
app.use("/api/comment", commentRouter);
app.use("/api/like", likeRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}!`);
  await connect();
});
