import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  events: [{
    ref: 'Event',
    type: mongoose.Schema.Types.ObjectId,
  }]
})

export default mongoose.model('User', userSchema)
