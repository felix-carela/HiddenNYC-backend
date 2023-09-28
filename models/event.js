import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  userId: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
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
    lat: {
      type: Number,
      required: true,
      min: -90,
      max: 90
    },
    lng: {
      type: Number,
      required: true,
      min: -180,
      max: 180
    }
  },
  imageUrl: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  comments: [{
    ref: 'Comment',
    type: mongoose.Schema.Types.ObjectId,
  }]
})

export default mongoose.model('Event', eventSchema);
