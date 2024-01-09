import express from "express";
import {
  addTask,
  deleteTask,
  getMyTasks,
  getSingleTask,
  isCompleted,
  updateTask,
} from "../controllers/task.js";
import { isAuthenticated } from "./../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addTask);

router.get("/my", isAuthenticated, getMyTasks);

router
  .route("/:id")
  .get(isAuthenticated,getSingleTask)
  .put(isAuthenticated,updateTask)
  .patch(isAuthenticated, isCompleted)
  .delete(isAuthenticated, deleteTask);

export default router;
