 import Task from "../models/Task.js"
 import mongoose from "mongoose";
 // Create Task start
 export const CreatetaskRepo = async(newTask) =>{
    await newTask.save() 
    return newTask;
}
 // Create Task end

 // Get All Task start
 export const getalltaskRepo = async() =>{
    const tasks = await Task.find()
          .populate('createdBy', 'firstName lastName email')   // get creator details
          .populate('assignTo', 'firstName lastName email'); // get assigned employee details
     return tasks

 }
 // Get All Task end

 // Get Task By Id start
export const getTaskByIdRepo = async (id)=>{
    
     const task = await Task.find({assignTo:id})
          .populate('createdBy', 'firstName lastName email')   // show user details
          .populate('assignTo', 'firstName lastName email');   // show employee details
          console.log(task)
    return task;
    
}
// Get Task By Id end