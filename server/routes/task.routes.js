import express from 'express'
import { assignTask, createTask, deleteTask, getAllTask, getAssignedusers, getTaskById, reAssignTask, updateTask } from '../controller/task.controller.js';
import { Auth } from "../middleware/authentication.js";
const router = express.Router();

router.post('/',createTask)
router.get('/',Auth(),getAllTask)
router.get('/:id',getTaskById)
router.put("/:id",updateTask)
router.delete("/:id",deleteTask)
router.post('/assigntask',assignTask)
router.delete('/reassigntask/:id',reAssignTask)
router.get("/getassignedusers/:id",getAssignedusers)

export default router