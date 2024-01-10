import express from "express";
import {
  getAllUsers,
  getMyDetail,
  getSingleUser,
  loginUser,
  logout,
  registerUser,
  updateUser,
} from "../controllers/user.js";

import { isAuthenticated } from "./../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get('/logout',logout)

router.route("/user/:id").get(getSingleUser).put(isAuthenticated,updateUser);

router.get("/me", isAuthenticated, getMyDetail);

export default router;
