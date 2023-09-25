import { Router } from "express";
import * as userController from '../controllers/users.js'

const router = Router()

router.get('/:id', userController.getProfile)
router.get('/new', userController.createUser)

export default router
