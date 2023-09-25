import User from '../models/user.js'
import Event from '../models/event.js'

export async function getProfile(req, res) {
  const handle = req.params.username
  const user = await User.findOne({ events })
  const events = await Event.find({ author: user._id })
  return res.json({
    ...user.toJSON(),
    events,
  })
}

export async function createUser(req, res) {
  const { username, googleId } = req.body
  const user = await User.create({ username, googleId })
  return res.json(user)
}
