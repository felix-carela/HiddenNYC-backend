import { Router } from "express";
import * as userController from '../controllers/users.js'

const router = Router()

router.get('/:handle', userController.getProfile)

export default router