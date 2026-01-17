import express from 'express'
import { createTask, deleteTask, getAllTask, getTaskById, updateTask } from '../controller/task.controller';
const router = express.Router();

router.post('/',createTask)
router.get('/',getAllTask)
router.get('/:id',getTaskById)
router.put("/:id",updateTask)
router.delete("/:id",deleteTask)

export default router