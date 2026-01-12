import express from "express";
import userRouter from "./user.routes.js"
import organizationRouter from "./organization.routes.js"
const router = express.Router();

router.use('/user',userRouter)
router.use('/organization',organizationRouter)

export default router;