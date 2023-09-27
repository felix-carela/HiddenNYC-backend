import { Router } from "express";
import * as eventController from '../controllers/events.js'


const router = Router()

router.get('/', eventController.getEvents)
router.post('/', eventController.createEvent)
router.delete('/:id/delete', eventController.deleteEvent)

export default router
