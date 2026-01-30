import express from 'express'
import { createOrganization, getAllOrganization, getOrganizationById, updateOrganization, deleteOrganization } from '../controller/organization.controller.js';
import { Auth } from "../middleware/authentication.js";
const router = express.Router();

router.post('/',Auth(),createOrganization)
router.get('/',Auth(),getAllOrganization)
router.get('/:id',Auth(),getOrganizationById)
router.put("/:id",Auth(),updateOrganization)
router.delete("/:id",Auth(),deleteOrganization)

export default router