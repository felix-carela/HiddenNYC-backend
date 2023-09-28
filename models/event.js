import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  userId: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  coordinates: {
    lat: {
      type: Number,
      min: -90,
      max: 90
    },
    lng: {
      type: Number,
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
  },
  comments: [{
    ref: 'Comment',
    type: mongoose.Schema.Types.ObjectId,
  }]
})

export default mongoose.model('Event', eventSchema);
