import express from "express";
import userRoute from "./routes/user.js";
import taskRoute from "./routes/task.js";
import connectDB from "./data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
  })
);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/task", taskRoute);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Home Page");
});
