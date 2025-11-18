import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import User from '../models/User.js';
import EmployeeProfile from '../models/EmployeeProfile.js';
import { sendEmail } from "../utils/mailService.js";
import { emailTemplates } from "../utils/emailTemplates.js";
import {
  findUserByEmail,
  findAllUser,
  FindUserIdandEmail,
  FindEmployeeId
} from '../repositories/userRepositories.js';
  // LoginUserService starts here
   export const LoginUserService = async (email, password) => {
   try {
    const user = await findUserByEmail(email);  
    if (!user) {
        throw new Error('User not found');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid password');
    }
    console.log(isMatch);
    const payload = {
          id: user._id,
          role: user.role,
          email: user.email,
        };
    
        // Sign JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN || "30m",
        });
        return{token,user};
    
   } catch (error) {
     throw  error;
    
   }
}
// LoginUserService end here


// Register User Service start here
export const RegisterUserService = async (userData) => {
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
  } = userData;
  
  

  // Check if user already exists
  const existingUser = await findUserByEmail(userData.email);
  console.log(existingUser);
  if (existingUser) {
    throw new Error('User already exists with this email');
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  
  // Create new user
  const newUser = new User({
    firstName,
    lastName,
    email,  
    password: hashedPassword,
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
  });
  await newUser.save();
  return newUser;
  } catch (error) {
    throw  error;
  }
}

// Get All user Services start
export const GetAllUserService = async () => {
  const allUser = await findAllUser();
  return allUser;

}
// Get All user Services end

// Helper to generate unique employee code
const generateEmployeeCode = () => {
  const prefix = "EMP";
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit code
  return `${prefix}${random}`;
};

// Approve User Services start
export const ApproveUserServices  =  async(userid)  => {
  const user = await FindUserIdandEmail(userid);
   // Create EmployeeProfile from User
   const employeeProfile = new EmployeeProfile({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      phone: user.phone,
      address: user.address,
      dateOfBirth: user.dateOfBirth,
      department: user.department,
      position: user.position,
      experience: user.experience,
      education: user.education,
      role: user.role,
      image: user.image,
      employeeCode: generateEmployeeCode(),
      status: "ACTIVE" // approved employee
    });

    await employeeProfile.save();

    // Delete user from pending User collection
    await user.deleteOne();
    
   // Send welcome email to approved employee
    let emailStatus = "Email sent successfully";
    try {
      await sendEmail({
        to: employeeProfile.email,
        subject: "🎉 Welcome to the Company!",
        html: emailTemplates.welcomeEmployee(employeeProfile),
      });
    } catch (emailErr) {
      res.error("Error sending email:", emailErr.message);
      emailStatus = "Employee approved, but email could not be sent.";
    }
  return {user,employeeProfile};

}
// Approve User Services end

////////Reject User Services start
 export const RejectUserServices = async(userid) =>{

  const user = await FindUserIdandEmail(userid)
  // Delete the pending user (rejected)
    await user.deleteOne();

  return{user}

 }
////////Reject User Services end 


// Forget Password Services start

export const ForgetPasswordServices = async(email) =>{
  try {
  const user = await findUserByEmail(email);
  console.log(user)
  
  // ✅ 2. Generate JWT reset token (valid for 10 minutes)
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    // ✅ 3. Try sending the email
   
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 40px;">
            <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); padding: 30px;">
              <h2 style="color: #333; text-align: center;">🔒 Password Reset Request</h2>
              <p style="font-size: 15px; color: #555;">
                Hi ${user.firstName || "there"},<br><br>
                We received a request to reset your password for your EMS account.
                Click the button below to choose a new password:
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="http://localhost:5173/reset-password/${token}" 
                   style="background-color: #007bff; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; display: inline-block;">
                   Reset Password
                </a>
              </div>

              <p style="font-size: 14px; color: #555;">
                This link will expire in <b>10 minutes</b> for your security.
              </p>
              <p style="font-size: 13px; color: #777;">
                If you didn’t request a password reset, you can safely ignore this email.
              </p>

              <hr style="margin: 25px 0; border: none; border-top: 1px solid #eee;">
              <p style="font-size: 12px; color: #888; text-align: center;">
                © ${new Date().getFullYear()} DevRolin EMS System. All rights reserved.
              </p>
            </div>
          </div>
        `,
      });  
      const respose = { 
        status: 200,
        message: "Reset email sent successfully"
      }
       return {user,respose};
      // ✅ 4. Send success response
    } catch (emailError) {
     throw emailError
    }




}

// Reset password service start 
export const ResetPasswordService = async(newPass,token) =>{
  const decoded = jwt.verify(token,process.env.JWT_SECRET)
  
  if(!decoded){
    throw new Error("Invalid or Expire Token")
  }
  const Emp  = await FindEmployeeId(decoded.userId);
  console.log(Emp)
  if(!Emp){
    throw new Error("Employee Not Found in a system Whom You want to reset password")
  }

  const hashedPassword = await bcrypt.hash(newPass,10);
  Emp.password =hashedPassword;
   await Emp.save();
  const response = "Password Reset Succesfully";
  console.log(Emp)

  return {Emp,response};

  
}