import { Router } from "express";
import * as userController from '../controllers/users.js'

const router = Router()

router.get('/:id', userController.getUserById)
router.post('/', userController.createUser)

export default router
