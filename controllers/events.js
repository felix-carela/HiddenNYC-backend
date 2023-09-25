import Post from '../models/event.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'

export async function getPosts(req, res) {
  try {
    const posts = await Post.find().populate('author')
    return res.status(200).json(posts)
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: `Unable to load posts`,
      db_message: error.message
    })
  }
}

export async function getPostById(req, res) {
  try {
    const id = req.params.id
    const post = await Post.findById(id).populate('author')

    if (!post) {
      throw new Error(`Post with id:${id} doesn't exist`)
    }

    return res.status(200).json(post) 
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message
    })
  }
}

export async function createPost(req, res) {
  try {
    const { username, twuut } = req.body
    const user = await User.findOne({ username: username })

    if (!user) {
      throw new Error(`User ${username} doesn't exist`)
    }

    const newPost = await Post.create({
      author: req.id,
      date: new Date(),
      text: twuut,
    })

    res.status(200).json(newPost)
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    })
  }
}