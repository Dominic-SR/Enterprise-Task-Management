import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import moment from 'moment';
import User from "../models/userSchema.js"
// import {errorHandler} from "../middleware/error.js"

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
    let saveUser = await postUser.save();
    let jwttoken = jwt.sign({
         _id:saveUser._id,
         name:saveUser.username,
         email:saveUser.email},
          process.env.JWT_SECRET
      )
      res.cookie('token',jwttoken,{
        httpOnly:true,
        expires:new Date(moment().add(31,'days')),
        overwrite: true,
      })

    
    res.status(201).json({ message: 'Registed successfully', data:{ _id: saveUser._id,
            email: saveUser.email,
            username: saveUser.username, role: saveUser.role},
            token:jwttoken});
  } catch (err) {
        // next(error)
        if (err.name === 'CastError') {
          return res.status(404).json({ error: 'Resource not found' });
        }

        // 2. Mongoose Duplicate Key (Error code 11000)
        if (err.code === 11000) {
          return res.status(400).json({ error: 'Email already exists' });
        }

        // 3. Mongoose Validation Error (Missing fields)
        if (err.name === 'ValidationError') {
          const message = Object.values(err.errors).map(val => val.message);
          return res.status(400).json({ error: message });
        }

        // Default: Internal Server Error
        res.status(err.statusCode || 500).json({
          error: error.message || 'Server Error'
        });
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
        
        res.cookie('token',jwttoken,{
          httpOnly:true,
          expires:new Date(moment().add(31,'days')),
          overwrite: true,
        })

      res.status(200).json({ 
            message: 'Login successfuly !',
            data:{ _id: getUser._id,
            email: getUser.email,
            username: getUser.username,
            role: getUser.role,},
            token:jwttoken
        });
      }
      else{
        res.status(401).json({message:'Invalid credentials!'})
      }
  } catch(err){
    res.status(500).json({message:'somthing went wrong !'})
  }

}


export const getAllUsers = async(req,res) =>{

    try{
       let getAllUsers = await User.find();
        res.status(201).json({ message: 'Users fetch successfully', data: getAllUsers });
    }
    catch(error){
        res.status(500).json({ message: 'Error get Users', error });
    }   
}

export const getUserById = async(req,res) =>{
    try{
        let getUser = await User.findById(req.params.id)
        res.status(201).json({ message: 'User fetch successfully', data: getUser });
    }
    catch(error){
        res.status(500).json({message:"Error get User", error})
    }
}