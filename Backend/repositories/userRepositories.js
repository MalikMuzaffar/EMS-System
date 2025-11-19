import User from '../models/User.js';
import EmployeeProfile from '../models/EmployeeProfile.js';

// find user by email
export const findUserByEmail = async (email) => { 
  console.log("Email received:", email);
  const user = await User.findOne({ email }).select("+password");
  return user;
};

// find all users
export const findAllUser = async () => { 
  return await User.find().select("-password");
};

// find user by ID
export const FindUserIdandEmail = async (userid) => {
  const user = await User.findById(userid);
  return user;
};

// find employee by ID
export const FindEmployeeId = async (Empid) => {
  const Emp = await EmployeeProfile.findById(Empid);
  return Emp;
};

