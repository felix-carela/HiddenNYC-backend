import { Router } from "express";
import * as eventController from '../controllers/events.js'

const router = Router()

router.get('/event', eventController.getEvents)
router.post('/:id/', eventController.createEvent)
router.delete('/:id', eventController.deleteEvent)

export default router
