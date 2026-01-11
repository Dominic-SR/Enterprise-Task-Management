import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import moment from 'moment';
import User from "../models/userSchema.js"
import {errorHandler} from "../middleware/error.js"

export const createUser = async (req, res, next) => {
let { username, email, password, role} = req.body;
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
            role: role,
    }); 
    let addUser = await postUser.save();
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    // next(error)
    res.status(500).json({ message: 'Error adding user', error });
    }
  }



export const login = async (req,res) => {
  const {email, password} = req.body;

  if(!email || !password){
    return res.status(400).json({message:'invalid login'})
  }

  try{
    const getUser = await User.findOne({ email }).select('+password');
    
    if (!getUser) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    let isCheckPassword = await bcrypt.compare(password,getUser.password)

    if(isCheckPassword){
        let jwttoken = jwt.sign({
         _id:getUser._id,
         name:getUser.username,
         email:getUser.email},
          process.env.JWT_SECRET
      )

      res.cookie('auth_token',jwttoken,{
        httpOnly:true,
        expires:new Date(moment().add(31,'days')),
        overwrite: true,
      })
    console.log("AAA",jwttoken);
      res.status(200).json({ 
            message: 'Login successfuly !',
           data:{ _id: getUser._id,
            email: getUser.email,
            username: getUser.username}
        });
      }
      else{
        res.status(401).json({message:'Invalid credentials!'})
      }
  } catch(err){
    res.status(500).json({message:'somthing went wrong !'})
  }

}