import mongoSanitize from "express-mongo-sanitize";
import connect from "./db";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from "./routes/user.routes";
import videoRouter from "./routes/video.routes";
import viewRouter from "./routes/view.routes";
import subscribeRouter from "./routes/subscribe.routes";
import commentRouter from "./routes/comment.routes";
import likeRouter from "./routes/like.routes";
const config = require("./config/key");
const app: Express = express();
const PORT = process.env.PORT || 5000;

require("dotenv").config({ path: __dirname + "/../.env" });
app.use(express.static("build"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(mongoSanitize());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const store = new MongoStore({
  mongoUrl: config.mongoURI as string,
  touchAfter: 24 * 60 * 60,
});

app.use(
  session({
    secret: (process.env.COOKIE_SECRET as string) || "secret",
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false,
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
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}!`);
  await connect();
});
