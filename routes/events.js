import { Router } from "express";
import * as postController from '../controllers/events.js'

const router = Router()

router.get('/', postController.getPosts)
router.get('/:id', postController.getPostById)
router.post('/', postController.createPost)

export default router