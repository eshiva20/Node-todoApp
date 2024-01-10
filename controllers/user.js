import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { createCookie } from "../utils/createCookie.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const Users = await User.find();
    res.json({
      message: "Succes",
      data: Users,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });
    createCookie(user, res, 201, "User Created Successfully", "register");
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { image, name } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);

    user.image = image;
    user.name = name;

    await user.save();

    res.status(200).json({
      status: "Success",
      message: "User Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    createCookie(user, res, 200, "User Loged in Successfully", "login");
  } catch (error) {
    next(error);
  }
};

export const getMyDetail = (req, res) => {
  res.json({
    status: "Success",
    message: "User Details Fetched",
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      status: "Success",
      message: "Loged Out Succesfully",
    });
};
