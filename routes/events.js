import { Router } from "express";
import * as postController from '../controllers/events.js'
import verifyAuth from "../middlewares/veryAuth.js";

const router = Router()

router.get('/', postController.getPosts)
router.get('/:id', verifyAuth, postController.getPostById)
router.post('/', verifyAuth, postController.createPost)

export default router