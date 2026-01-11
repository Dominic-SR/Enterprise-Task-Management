import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import moment from 'moment';
import User from "../models/userSchema.js"
import {errorHandler} from "../middleware/error.js"

export const createUser = async (req, res, next) => {
let { username, email, password, rold_id, organization_id } = req.body;
    if (!username || !email || !password) {
    return res.status(400).json({ message: 'Need to required fields !' });
  }

  try {
    const hashpassword = await bcrypt.hash(password,10);
    password = hashpassword
    let postUser = await new User({
            username:username,
            email:email,
            password: password,
            rold_id: rold_id,
            organization_id: organization_id
    }); 
    let addUser = await postUser.save();
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    next(error)
    // console.log("EERRRR",error);
    // res.status(500).json({ message: 'Error adding user', error });
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