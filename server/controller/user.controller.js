import {addUser, getUserByEmail, loginUserModel} from '../module/user.model.js';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import moment from 'moment';


export const createUser = async (req, res) => {
    const { user_name, user_email, user_password, user_phoneno, user_picture } = req.body;
    if (!user_email || !user_password) {
    return res.status(400).json({ message: 'Need to required fields !' });
  }

  try {
    let user_org_pass = user_password;
    const hashpassword = await bcrypt.hash(user_password,10);
    await addUser(user_name, user_email, hashpassword, user_org_pass, user_phoneno, user_picture);
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    if(error.code = "ER_DUP_ENTRY"){
      
      // You might check the error message to see which field was duplicated
        let field = 'User';
        if (error.sqlMessage.includes('user_phoneno')) {
            field = 'Phone no';
        } else if (error.sqlMessage.includes('user_email')) {
            field = 'Email';
        }
        return res.status(401).json({ 
            message: `${field} already exists. Please choose a different one.` 
        });
    }
    res.status(500).json({ message: 'Error adding user', error });
  }
}


export const loginUser = async (req,res) => {
  
  const {user_email, user_password} = req.body;

  if(!user_email || !user_password){
    return res.status(400).json({message:'invalid login'})
  }

  try{

    let getUserByEmailId = await getUserByEmail(user_email);
    
    let isCheckPassword = await bcrypt.compare(user_password,getUserByEmailId[0].user_password)
      if(isCheckPassword){

        
        let jwttoken = jwt.sign({
          user_id:getUserByEmailId[0].user_id, 
          user_name:getUserByEmailId[0].user_name, 
          user_email:getUserByEmailId[0].user_email},
          process.env.JWT_SECRET
        )

      res.cookie('auth_token',jwttoken,{
        httpOnly:true,
        expires:new Date(moment().add(31,'days')),
        overwrite: true,
      })

      res.status(200).json({ 
            message: 'Login successfuly !',
            user_id: getUserByEmailId[0].user_id,
            user_email: getUserByEmailId[0].user_email
        });
      }
      else{
        res.status(401).json({message:'Invalid credentials!'})
      }
  } catch(err){
    res.status(500).json({message:'somthing went wrong !'})
  }

}