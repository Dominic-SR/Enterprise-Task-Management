import express from 'express'
import { createOrganization, getAllOrganization, getOrganizationById, updateOrganization, deleteOrganization } from '../controller/organization.controller.js';
const router = express.Router();

router.post('/',createOrganization)
router.get('/',getAllOrganization)
router.get('/:id',getOrganizationById)
router.put("/:id",updateOrganization)
router.delete("/:id",deleteOrganization)

export default router