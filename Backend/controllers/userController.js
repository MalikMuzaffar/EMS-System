import User from "../models/User.js";
import Emp  from "../models/EmployeeProfile.js";
import bcrypt from "bcryptjs";


import EmployeeProfile from '../models/EmployeeProfile.js';
import { sendEmail } from "../utils/mailService.js";
import {
  LoginUserService,
  RegisterUserService,
  GetAllUserService,
  ApproveUserServices,
  RejectUserServices,
  ForgetPasswordServices,
  ResetPasswordService,
  
 } from "../Services/userServices.js";


// User Signup
export const registerUser = async (req, res,next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      dateOfBirth,
      department,
      position,
      experience,
      education,
      image,
      role,
      status,
    } = req.body;


    // ✅ Only check required fields
    if (!firstName || !lastName || !email || !password || !department || !position) {
      
       return res.error("Please fill all required fields", {  }, 400);
        
    }

    const {newUser} = await RegisterUserService({firstName,lastName,email,password,phone,address,dateOfBirth,department,position,experience,education,image,role,status});
    res.success("User registered successfully", {newUser }, 201);
  } catch (error) {
    console.log(error)
     res.error(error.message, { message: error.message }, 500);
  }
};


// User Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
   
   if (!email || !password) {
      
      return res.error("Please provide email and password",{},400)
    }

    const{token, user} = await LoginUserService(email, password);

    // Send response without password
    res.success("Login successful hogiya hy", {user, token  }, 200);
  } catch (error) {
     res.error(error.message, { message: error.message }, 400);
    
  }
};

// Get All Users funtion start
export const getAllUsers = async (req, res) => {
  try {
    const users = await GetAllUserService()
   
    //  res.status(200).json(users);
    res.success("successfully Get All users",{users},200)
  } catch (error) {
    res.error("Error fetching users", { message: error.message }, 500);
  }
};
// Get All Users funtion end


// Approve User start
export const approveUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find pending user
    const {user,employeeProfile} = await ApproveUserServices(userId)
    if (!user){
     return res.error("User not found",{},404)
    }
    res.success("User approved and added as Employee",{employeeProfile},200)

  } catch (err) {
    res.error("Error approving user",{error: err.message},500)
  }
};
// approve user end


// Rejected User start
// rejectUser Controller
 export const rejectUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user in pending User collection
    // const user = await User.findById(userId);
    const {user} = await RejectUserServices(userId)

    if (!user) {
      // throw res.status(404).json({ message: "User not found or already processed" });
      throw res.error("User not found or already processed",{},404)
    }
    res.success("User has been rejected and removed from pending list",{user},200)

  } catch (err) {
      res.error("Error rejecting user",{error: err.message },500)
  }
};
// Reject User End

// ==================== Forget Password ====================
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // ✅ 1. Find user by email
    const {user,respose} = await ForgetPasswordServices(email);
    if (!user) {
      return res.error("User not found",{},404)
    }

    
   res.success(respose.message,{user},respose.status)
  } catch (error) {
    res.error("Error while forgating Password",{message:error.message},500)
  }
};

// ==================== Reset Password ====================
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

   const {Emp,response} = await ResetPasswordService(newPassword,token)
    
    res.success(response,{Emp},200)
  } catch (error) {
    res.error("Error while reset Password",{ message: error.message},500)
  }
};