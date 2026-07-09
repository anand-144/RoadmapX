import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    roadmap: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roadmap",
        required: true,
    },
    completedTopics: [
        {
            type: mongoose.Schema.Types.ObjectId,
        },
    ],

    completionPercentage :{
        type: Number,
        default : 0,
    },

    isCompleted: {
        type: Boolean,
        default: false,
    },

    lastCompletedTopic: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
}, {timestamps: true}); 

progressSchema.index({user: 1, roadmap: 1},{unique: true});

export default mongoose.model("Progress", progressSchema);