import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  userId: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  eventName: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90
    },
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180
    }
  },
  category: {
    type: String,
    enum: ['Music', 'Sports', 'Food', 'Arts', 'Other'],
    required: true
  }
})

export default mongoose.model('Event', eventSchema);
