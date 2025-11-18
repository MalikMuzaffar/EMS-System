import Task from '../models/Task.js';
import {CreatetaskRepo,
    getalltaskRepo,
    getTaskByIdRepo

} from '../repositories/taskRepositories.js'
export const CreatetaskService = async(task)=>{
    try {
        const {userid,
      title,
      description,
      priority,
      dueDate,
      assignTo} = task;

     const CreateTask = new Task({
      title,
      description,
      createdBy: userid, // Use the authenticated user's ID 
      priority,
      dueDate,
      assignTo,
    });
    
    const newTask = await CreatetaskRepo(CreateTask);
    console.log(newTask)
    return newTask;
        
    } catch (error) {
        throw Error(error.message);
        
    }
}
// Get All Task Services start
export const getAllTaskService = async () =>{
    const tasks = await getalltaskRepo()
    return tasks;

}
// Get All Task Services end

// Get  Task By Id Services  start 
export const getTaskByIdService = (id)=>{
    const tasks = getTaskByIdRepo(id)
    return tasks;

}
// Get  Task By Id Services  end

