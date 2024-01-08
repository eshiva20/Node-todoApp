import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const addTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(200).json({
      status: "Success",
      message: "Task Added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTasks = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const tasks = await Task.find({ user: userId });

    res.status(200).json({
      status: "Success",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const isCompleted = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task Not Found", 404));

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      status: "Success",
      message: "Task Status Updated Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task Not Found", 404));

    await task.deleteOne();

    res.status(200).json({
      status: "Success",
      message: "Task Deleted Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};
