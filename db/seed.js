import 'dotenv/config'
import mongoose from 'mongoose'
import './connection.js'
import User from '../models/user.js'
import Post from '../models/posts.js'

await User.deleteMany()
await Post.deleteMany()

const user = await User.create({
  username: 'Felix Carela',
  handle: 'felixcarela',
  posts: []
})

await Post.insertMany([
  {
    text: 'Run `"ba" + +"a" + "a"` in the browser console and you get 🍌',
    date: '2023-03-03T16:16:08.888Z',
    author: user._id,
  },
  {
    text: 'TIL you can restart nodemon by typing `rs` and hitting enter',
    date: '2023-03-07T16:16:08.888Z',
    author: user._id,
  },
  {
    text: 'Typescript > Javascript\nChange my mind.',
    date: '2023-03-08T16:16:08.888Z',
    author: user._id,
  },
  {
    text: 'Rust will be the future of programming languages',
    date: '2023-03-09T16:16:08.888Z',
    author: user._id,
  }
])

await mongoose.disconnect()