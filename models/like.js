import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  isLiked: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


// This ensures a user can't like or dislike the same event more than once
likeSchema.index({ user: 1, event: 1 }, { unique: true });

export default mongoose.model('Like', likeSchema);
