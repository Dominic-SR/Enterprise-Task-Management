import { resolve } from "path";
import db from "../utils/config.js"

export const addUser = (user_name, user_email, hashpassword, user_org_pass, user_phoneno, user_picture) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO user_table (user_name, user_email, user_password, user_org_pass, user_phoneno,user_picture) VALUES (?, ?, ?, ?, ?, ?)', [user_name, user_email, hashpassword, user_org_pass, user_phoneno, user_picture], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export const getUserByEmail = (user_email) => {
  return new Promise((resolve,reject)=>{
    db.query(`select user_id,user_name, user_email, user_password, user_phoneno, user_picture from user_table where user_email = '${user_email}'`,(err,result)=>{
      if(err){return reject(err)}
      resolve(result)
    })
  })
}

export const loginUserModel = (user_email, hashpassword)=>{

  return new Promise((resolve, reject) =>{
    let a =`select user_name, user_email, user_phoneno, user_picture from user_table where user_email = '${user_email}' and user_password ='${hashpassword}'`
    console.log("AAA",a);
    
    db.query(`select user_name, user_email, user_phoneno, user_picture from user_table where user_email = '${user_email}' and user_password ='${hashpassword}'`,(err,result)=>{
      if(err) return reject(err);
      resolve(result)
    })
  })
}