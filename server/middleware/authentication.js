// const jwt = require('jsonwebtoken');
// const { getUser } = require('../Models/User.Model');

// const Auth = () => async (req, res, next) =>{
//     try{
//         const token = req.headers.authorization || null;
//         if (!token) {
//          res.send(
//                     {
//                         status: false,
//                         message: "Token Expired...!"
//                     }
//                 )
//         }
//         else{
//             const user = jwt.verify(token, process.env.JWT_SECRET);
//             if(user){
//             const {user_id} = user   
//             const userData = await getUser(user_id);
//             if(Object.keys(userData[0]).length > 0){
//                 req.user={
//                     user_id:user_id,
//                     user_name:userData[0][0].user_name,
//                     user_email:userData[0][0].user_email,
//                     user_mobile:userData[0][0].user_mobile,
//                     role_id:userData[0][0].role_id,
//                     user_img:userData[0][0].user_img,
//                     user_about:userData[0][0].user_about
//                 }
//                 next();
//             }else{
//                 res.send({
//                     status:false,
//                     message: "User not Available..."
//                 })
//             }
            
//             }
//             else{
//                 res.send({
//                     status:false,
//                     message:"Unauthorized to access this url ......"
//                 })
//             }
            
//         }
//     }
//     catch(err){
//         console.log("err",err);
//     }
// }

// module.exports = {Auth}

import jwt from 'jsonwebtoken';
// import { getUser } from '../Models/User.Model.js';

export const Auth = () => async (req, res, next) => {
    
    try {
        const authHeader = req.headers.authorization;
        
        // 1. Check if token exists
        if (!authHeader) {
            return res.status(401).json({
                status: false,
                message: "No token provided."
            });
        }

        // 2. Verify Token
        // Note: If using "Bearer <token>", use authHeader.split(' ')[1]
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
        console.log("XXX",decoded);

        // 3. Fetch User Data
        const userData = await getUser(decoded.user_id);

        // Check if user exists in DB (assuming userData[0][0] structure)
        if (userData?.[0]?.length > 0) {
            const user = userData[0][0];
            
            req.user = {
                user_id: decoded.user_id,
                user_name: user.user_name,
            };
            
            return next();
        } 

        return res.status(404).json({
            status: false,
            message: "User not available."
        });

    } catch (err) {
        console.error("Auth Middleware Error:", err.message);
        
        // Handle specific JWT errors
        const message = err.name === 'TokenExpiredError' ? "Token Expired!" : "Unauthorized access.";
        return res.status(401).json({
            status: false,
            message
        });
    }
};