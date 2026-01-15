import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task:{
        type:String,
        require:[true, "Task name is required"]
    }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;