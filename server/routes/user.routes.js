import express from 'express'
import { createUser, loginUser } from "../controller/user.controller.js"
import { uploadSingleFile } from '../middleware/fileUpload.js';
import { errorHandler } from '../middleware/error.js';
const router = express.Router()
const app = express();
app.use(express.json());

router.post('/create',createUser);
// router.post('/login', loginUser)
app.use(errorHandler);
export default router;