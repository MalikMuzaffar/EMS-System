
import EmployeeProfile from '../models/EmployeeProfile.js';
import User from '../models/User.js';

// console.log(email);
// find user by email start
 export  const findUserByEmail = async (email) => { 
    const user = await EmployeeProfile.findOne({ email: email });
    //console.log(email);
    return user;
}
   
    // find user by email end

    // find get All user  start
  export   const findAllUser = async (email) => { 
    const allUser = await User.find().select("-password");
    return allUser;
}
    
    // find get All user  end
    
    // find User id and email function is start
   export const FindUserIdandEmail  = async(userid) =>{
       const user = await User.findById(userid);
       return user;

    }
   // find User id and email function is end


   
    // find Employee by id  start
   export const FindEmployeeId  = async(Empid) =>{
       const Emp = await EmployeeProfile.findById(Empid);
       return Emp;

    }
   // find Employee by  end
 
   
 