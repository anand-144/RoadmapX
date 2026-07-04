import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, 
    },
    roadmap:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roadmap",
        required: true, 
    },
    content:{
        type: String,
        required: true,
        trim: true,
    },
    isEdited:{
        type: Boolean,
        default: false,
    },
},{timestamps: true});

export default mongoose.model("Comment" , commentSchema);

