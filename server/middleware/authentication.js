import jwt from 'jsonwebtoken';
import User from "../models/userSchema.js"
export const Auth = () => async (req, res, next) => {
    
    try {
        const authHeader = req.headers.auth;

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
        
        // 3. Fetch User Data
        const getUser = await User.findById(decoded._id)
        
        // Check if user exists in DB (assuming userData[0][0] structure)
        if (Object.values(getUser).length > 0) {
            const user = getUser;
            
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