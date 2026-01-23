const jwt = require('jsonwebtoken');
const { getUser } = require('../Models/User.Model');

const Auth = () => async (req, res, next) =>{
    try{
        const token = req.headers.authorization || null;
        if (!token) {
         res.send(
                    {
                        status: false,
                        message: "Token Expired...!"
                    }
                )
        }
        else{
            const user = jwt.verify(token, process.env.JWT_SECRET);
            if(user){
            const {user_id} = user   
            const userData = await getUser(user_id);
            if(Object.keys(userData[0]).length > 0){
                req.user={
                    user_id:user_id,
                    user_name:userData[0][0].user_name,
                    user_email:userData[0][0].user_email,
                    user_mobile:userData[0][0].user_mobile,
                    role_id:userData[0][0].role_id,
                    user_img:userData[0][0].user_img,
                    user_about:userData[0][0].user_about
                }
                next();
            }else{
                res.send({
                    status:false,
                    message: "User not Available..."
                })
            }
            
            }
            else{
                res.send({
                    status:false,
                    message:"Unauthorized to access this url ......"
                })
            }
            
        }
    }
    catch(err){
        console.log("err",err);
    }
}

module.exports = {Auth}