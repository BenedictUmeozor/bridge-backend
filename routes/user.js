import express from "express";
import { getUser, updateProfile } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUser);
router.put("/update", updateProfile);

export default router;
