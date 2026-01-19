import mongoose from "mongoose";

const assignTaskSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true    
    },
    user_id:{
        type:String,
        require:true
    },
    task_id:{
        type:String,
        require:true
    },
    createBy:{
        type:String,
        require:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const AssignTask = mongoose.model('AssignTask', assignTaskSchema);

export default AssignTask;