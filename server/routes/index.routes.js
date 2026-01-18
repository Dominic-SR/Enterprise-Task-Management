import express from "express";
import userRouter from "./user.routes.js"
import organizationRouter from "./organization.routes.js"
import taskRouter from "./task.routes.js"
const router = express.Router();

router.use('/user',userRouter)
router.use('/organization',organizationRouter)
router.use('/task',taskRouter)

export default router;