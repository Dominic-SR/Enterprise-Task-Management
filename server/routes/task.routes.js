import express from 'express'
import { assignTask, createTask, deleteTask, getAllTask, getAssignedusers, getTaskById, reAssignTask, updateTask } from '../controller/task.controller.js';
import { Auth } from "../middleware/authentication.js";
const router = express.Router();

router.post('/',Auth(),createTask)
router.get('/:id',Auth(),getAllTask)
router.get('/:id',Auth(),getTaskById)
router.put("/:id",Auth(),updateTask)
router.delete("/:id",Auth(),deleteTask)
router.post('/assigntask',Auth(),assignTask)
router.delete('/reassigntask/:id',Auth(),reAssignTask)
router.get("/getassignedusers/:id",Auth(),getAssignedusers)

export default router