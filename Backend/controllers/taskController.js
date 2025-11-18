import Task from '../models/Task.js';
import { CreatetaskService,
  getAllTaskService,
  getTaskByIdService
 } from '../Services/taskServices.js';

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, createdBy, priority, dueDate, assignTo } = req.body;
   const userid = req.user._id;
    // Validate required fields
    if (!title || !description || !assignTo) {
      res.error("Title, createdBy, and assignTo are required",{},400)
    }
    
    const newTask = await CreatetaskService({userid,title, description, priority, dueDate, assignTo})
    res.success("Task created successfully",{newTask},201)
  } catch (error) {
    console.error('Error creating task:', error);
    res.error("Server error",{error: error.message},500)
  }
};




//  Get all tasks
export const getAllTasks = async (req, res) => {
  try {
     const tasks = await getAllTaskService()
     res.success("get Task",{tasks,count: tasks.length},200)
  } catch (error) {
    res.error("Error fetching tasks",{error: error.message},500)
  }
};



// ✅ Get task by ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
  const task = await getTaskByIdService(id);
    if (!task) {

      throw new Error("Task not found")
    }

    res.success("",{task},200)
  } catch (error) {
    res.error("Error fetching task",{error: error.message},500)
  }
};
    
  

// ✅ Update Task by ID
// ✅ Update Task by ID (Employee can only update status)
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Task find karo
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Agar employee hai (not Admin/HR), to sirf apne task ka status update kar sakta hai
    if (req.user.role === "Employee") {
      if (task.assignTo.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this task" });
      }

      // Employee sirf status update kar sake
      task.status = req.body.status || task.status;
    } else {
      // Admin / HR ko full update rights hain
      Object.assign(task, req.body);
    }

    const updatedTask = await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error: error.message });
  }
};

// ✅ Delete Task by ID
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      task: deletedTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
};


