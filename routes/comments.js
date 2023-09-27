import { Router } from "express";
import * as commentController from '../controllers/comments.js'

const router = Router()

router.put('/:id', commentController.updateComment)
router.post('/:id/', commentController.createComment)
router.delete('/:id', commentController.deleteComment)

export default router