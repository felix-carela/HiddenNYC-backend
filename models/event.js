import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  userId: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  address: String,
  category: {
    enum: ['Music', 'Sports', 'Food', 'Arts', 'Other']
  }
})

export default mongoose.model('Event', eventSchema)
