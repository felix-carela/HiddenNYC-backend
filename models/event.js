import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  author: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  text: {
    type: String,
    require: true,
    minLength: 1,
    maxLength: 280
  },
  date: Date,
})

// Export Post
export default mongoose.model('Post', postSchema)
