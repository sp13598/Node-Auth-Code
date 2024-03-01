import express from "express";
import roleRoute from "./roleRoutes.js";
import authRoute from "./authRoutes.js";
import userRoute from "./userRoute.js"

const router = express.Router();

router.use("/role", roleRoute);
router.use("/auth", authRoute);
router.use('/user', userRoute);


export default router;


