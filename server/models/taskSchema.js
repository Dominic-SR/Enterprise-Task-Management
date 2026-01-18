import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task:{
        type:String,
        require:[true, "Task name is required"]
        },
    description:{
        type:String
    },
    assignto:{
        type:String,
        require:true
    },
     status:{
        type:String,
        require:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;