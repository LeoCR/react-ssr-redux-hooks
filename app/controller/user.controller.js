import path from 'path'; 
import {decrypt} from '../utils/secure.js';
import jwt from 'jsonwebtoken';
import {SECRET_KEY} from "../constants/constants";

const db = require(path.resolve(__dirname+'/../config/config.js')),
User = db.user; 

exports.findUserByEmail=async (req,res)=>{
    var email="";
    var pswd="";
    if(req.body.email!==""){
        email=req.body.email;
    }
    if(req.body.password!==""){
        pswd=req.body.password;
    }
    return await User.findOne({ 
        where: {
            email: email
        } 
    }).then(userByEmail => {
            if (!userByEmail) { 
                res.json({user:"Email not found"})
            }
            else{
                const encryptedPassword={
                    password_encrypted:userByEmail.password_encrypted,
                    password_iv:userByEmail.password_iv
                }
                let tempPswd=decrypt(encryptedPassword)
                if(tempPswd===pswd){
                    jwt.sign({ user:userByEmail }, SECRET_KEY,{expiresIn:'7 days'}, (err, token)=>{
                        if(err){
                            res.json({
                                message:"An error occurs",
                                error:err
                            });
                        }
                        res.json({
                            token,
                            user:userByEmail
                        })
                    }); 
                    
                }
                else{
                    res.json({
                        message:"Invalid Password"
                    })
                }
                
            } 
    })
    .catch((err)=>{
        res.json({
            error:"An error occurs",
            message:err
        })
    })  
}
exports.findUserByUsername=async (req,res)=>{
    var userName=""; 
    var pswd="";
    if(req.body.username!==""){
        userName=req.body.username;
    } 
    if(req.body.password!==""){
        pswd=req.body.password;
    }
    return await User.findOne({ 
        where: {
            username: userName
        } 
    }).then(userByUsername => {
            if (!userByUsername) { 
                res.json({user:"Username not found"})
            }
            else{
                const encryptedPassword={
                    password_encrypted:userByUsername.password_encrypted,
                    password_iv:userByUsername.password_iv
                }
                let tempPswd=decrypt(encryptedPassword)
                if(tempPswd===pswd){
                    jwt.sign({ user:userByUsername },SECRET_KEY,{expiresIn:'7 days'}, (err, token)=>{
                        if(err){
                            res.json({
                                message:"An error occurs",
                                error:err
                            });
                        }
                        res.json({
                            token,
                            user:userByUsername
                        })
                    }); 
                    
                }
                else{
                    res.json({
                        message:"Invalid Password"
                    })
                }
            } 
    })
    .catch((err)=>{
        res.json({
            error:err
        })
    })  
} 
