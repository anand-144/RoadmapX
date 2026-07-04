import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
      user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    roadmap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roadmap",
      required: true,
    },
},{timestamps: true});

likeSchema.index({ user: 1, roadmap: 1 }, { unique: true });

export default mongoose.model("Like", likeSchema);