import express from 'express'
import { createUser, getAllUsers, getUserById, login } from "../controller/user.controller.js"
// import { uploadSingleFile } from '../middleware/fileUpload.js';
// import { errorHandler } from '../middleware/error.js';
const router = express.Router()
// const app = express();
// app.use(express.json());

router.post('/register',createUser);
router.post('/login',login)
router.get("/",getAllUsers)
router.get("/:id",getUserById)
// app.use(errorHandler);
export default router;