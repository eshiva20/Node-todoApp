import express from "express";
import {
  addTask,
  deleteTask,
  getMyTasks,
  isCompleted,
} from "../controllers/task.js";
import { isAuthenticated } from "./../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addTask);

router.get("/my", isAuthenticated, getMyTasks);

router
  .route("/:id")
  .put(isAuthenticated, isCompleted)
  .delete(isAuthenticated, deleteTask);

export default router;
