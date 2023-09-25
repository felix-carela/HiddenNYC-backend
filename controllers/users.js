import User from '../models/user.js'
import Post from '../models/event.js'

export async function getProfile(req, res) {
  const handle = req.params.handle
  const user = await User.findOne({ handle })
  const posts = await Post.find({ author: user._id })
  return res.json({
    ...user.toJSON(),
    posts,
  })
}