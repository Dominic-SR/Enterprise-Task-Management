import Task from "../models/taskSchema.js"
import AssignTask from "../models/assignTaskSchema.js";

export const createTask = async(req,res) =>{
    let { task, description, createBy } = req.body

    try{
        let addTask = await new Task({
                    task:task,
                    description:description,
                    createBy: createBy,
                    status:"To Do"
            });
            
        await addTask.save();
        res.status(201).json({ message: 'Task added successfully',data:addTask });
    }
    catch(error){
        res.status(500).json({ message: 'Error adding Task', error });
    }   
}

export const getAllTask = async(req,res) =>{

    try{
       let getAllTask = await Task.find();
        res.status(201).json({ message: 'Task fetch successfully', data: getAllTask });
    }
    catch(error){
        res.status(500).json({ message: 'Error get Task', error });
    }   
}

export const getTaskById = async(req,res) =>{
    try{
        let getTask = await Task.findById(req.params.id)
        res.status(201).json({ message: 'Task fetch successfully', data: getTask });
    }
    catch(error){
        res.status(500).json({message:"Error get Task", error})
    }
}

export const updateTask = async(req,res)=>{
    try{
      let { task, description, createBy } = req.body;
      const updateOrganization = await Task.findOneAndUpdate({_id:req.params.id},{$set:{task:task,description:description,createBy:createBy}});
      res.status(200).json({ message: 'Task update successfully', data: updateOrganization });
    }
    catch(error){
        res.status(500).json({message:"Error Update Task", error})
    }
}

export const deleteTask = async(req,res)=>{
    try{
      await Task.deleteOne({_id:req.params.id});
      res.status(200).json({ message: 'Task deleted successfully' });
    }
    catch(error){
        res.status(500).json({message:"Error delete Task", error})
    }
}

export const assignTask = async(req,res) =>{
    let {username, user_id,task_id,createBy} = req.body;
    try{
        let assignTask = await new AssignTask({
                    username:username,
                    user_id:user_id,
                    task_id:task_id,
                    createBy:createBy
            });
            
        await assignTask.save();
        res.status(200).json({ message: 'Task assigned successfully' });
    }
   
    catch(error){
        res.status(500).json({ message: 'Error adding Task assigned', error });
    }   
}

export const reAssignTask = async(req,res) =>{

    try{
      await AssignTask.deleteOne({_id:req.params.id});
      res.status(200).json({ message:'Task re assigned successfully'});
    }
    catch(error){
        res.status(500).json({ message: 'Error adding Task assigned', error });
    }   
}

export const getAssignedusers = async(req,res)=>{
     try{
        let getAssignedUser = await AssignTask.find({'task_id':req.params.id})
        res.status(201).json({ message: 'Assigned Users fetch successfully', data: getAssignedUser });
    }
    catch(error){
        res.status(500).json({message:"Error get Assigned Users", error})
    }
}