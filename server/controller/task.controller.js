import Task from "../models/taskSchema.js"

export const createTask = async(req,res) =>{
    let { task, decription, assignto } = req.body

    try{
        let addTask = await new Task({
                    task:task,
                    decription:decription,
                    assignto: assignto
            });
        await addTask.save();
        res.status(201).json({ message: 'Task added successfully' });
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
           let { task, decription, assignto } = req.body
      const updateOrganization = await Organization.findOneAndUpdate({_id:req.params.id},{$set:{task:task,decription:decription,assignto:assignto}})
      res.status(200).json({ message: 'Task update successfully', data: updateOrganization });
    }
    catch(error){
        res.status(500).json({message:"Error get Task", error})
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