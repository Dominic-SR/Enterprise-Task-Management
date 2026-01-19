import express from 'express'
import { assignTask, createTask, deleteTask, getAllTask, getTaskById, updateTask } from '../controller/task.controller.js';
const router = express.Router();

router.post('/',createTask)
router.get('/',getAllTask)
router.get('/:id',getTaskById)
router.put("/:id",updateTask)
router.delete("/:id",deleteTask)
router.post('/assignto',assignTask)

export default router