import express from "express";
import { getAllUser, getUserByID } from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router()

router.get('/getAll', verifyAdmin, getAllUser)
router.get('/:id', verifyUser, getUserByID)


export default router;