import { Router } from "express";
import * as eventController from '../controllers/events.js'

const router = Router()

router.get('/', eventController.getEvents)
router.post('/', eventController.createEvent)
router.delete('/:id', eventController.deleteEvent)
router.put('/:id', eventController.updateEvent)

export default router
