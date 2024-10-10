import express from "express";
import { login, logout } from "../controllers/auth/auth.controllers.js";
import { verifyToken } from "../middlewares/validateToken.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", verifyToken, logout);

export default router;
