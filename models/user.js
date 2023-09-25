import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  posts: [{
    ref: 'Post',
    type: mongoose.Schema.Types.ObjectId,
  }]
})

export default mongoose.model('User', userSchema)
