import { Router } from "express";
import * as eventController from '../controllers/events.js'

const router = Router()

router.get('/:id', eventController.getEventById)
router.get('/event', eventController.getEvents)
router.post('/new', eventController.createEvent)
// router.put('/:id', eventController.updateEvent)
// router.delete('/:id', eventController.deleteEvent)

export default router
