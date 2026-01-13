import express from 'express'
import { createOrganization, getAllOrganization, getOrganizationById } from '../controller/organization.controller.js';
const router = express.Router();

router.post('/',createOrganization)
router.get('/',getAllOrganization)
router.get('/:id',getOrganizationById)
router.put("/",updateOrganization)

export default router