import express from 'express'
import { createUser, loginUser } from "../controller/user.controller.js"
import { uploadSingleFile } from '../middleware/fileUpload.js';
const router = express.Router()

router.post('/create',uploadSingleFile('user_picture') ,createUser);
router.post('/login', loginUser)

export default router;