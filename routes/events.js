import { Router } from "express";
import * as eventController from '../controllers/events.js'

const router = Router()

router.get('/', eventController.getPosts)
router.get('/:id', eventController.getPostById)
router.post('/', eventController.createPost)

export default router
