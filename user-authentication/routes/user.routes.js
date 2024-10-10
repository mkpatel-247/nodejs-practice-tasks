import express from "express";
import { addUser, userDetail } from "../controllers/users/user.controllers.js";
import { verifyToken } from "../middlewares/validateToken.js";

const router = express.Router();

router.post("/register", addUser);
router.get("/detail", verifyToken, userDetail);

export default router;
