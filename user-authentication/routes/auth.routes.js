import express from "express";
import { userRegister } from "../controllers/users/user.controllers.js";
import { login } from "../controllers/auth/auth.controllers.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", login);
router.get("/logout");

export default router;
