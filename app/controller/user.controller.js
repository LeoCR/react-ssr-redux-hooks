const path =require('path');
const {decrypt,encrypt} =require('../utils/secure.js'),
jwt =require('jsonwebtoken'),
db = require(path.resolve(__dirname+'/../config/config.js')),
User = db.user; 
const {SECRET_KEY} =require("../constants/constants");

exports.findUserByEmail=async (req,res)=>{
    var email="";
    var pswd="";
    try {
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
                    res.json({error:"Email not found"})
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
                                token/* ,
                                user:userByEmail */
                            })
                        }); 
                        
                    }
                    else{
                        res.json({
                            error:"Invalid Password"
                        })
                    }
                    
                } 
        })
        .catch((err)=>{
            if(userName===null||userName===undefined){
                res.json({
                    error:"The Username is required"
                })
            }
            if(pswd===null||pswd===undefined){
                res.json({
                    error:"The Password is required"
                })
            }
            else{
                res.json({
                    error:err
                })
            }
        }) 
    } catch (error) {
        res.json({
            error
        })
    } 
}
exports.findUserByUsername=async (req,res)=>{
    var userName=""; 
    var pswd=""; 
    try {
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
                    res.json({error:"Username not found"})
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
                                token/* ,
                                user:userByUsername */
                            })

                        }); 
                        
                    }
                    else{
                        res.json({
                            error:"Invalid Password"
                        })
                    }
                } 
        })
        .catch((err)=>{
            if(userName===null||userName===undefined){
                    res.json({
                        error:"The Username is required"
                    })
            }
            if(pswd===null||pswd===undefined){
                res.json({
                    error:"The Password is required"
                })
            }
            else{
                res.json({
                    error:err
                })
            }
        }) 
    } catch (error) {
        res.json({
            error
        })
    } 
} 
exports.createUser=async (req,res)=>{
    try {
        var password=encrypt(req.body.password);
        const newUser={
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username: req.body.username, 
            email:req.body.email,
            password_encrypted:password.password_encrypted.toString(),
            password_iv:password.password_iv.toString(),
            status:'active',
            created_at:new Date(), 
            updated_at:new Date()
        };
        return await User.create(newUser).then(userCreated => {	
            jwt.sign({ user:userCreated },SECRET_KEY,{expiresIn:'7 days'}, (err, token)=>{
                if(err){
                    res.json({
                        message:"An error occurs",
                        error:err
                    });
                }
                res.json({
                    token/* ,
                    user:userCreated */
                })
            }); 	 
        }).catch(err => {
            res.status(500).json({message: "An error occurred."+ err});
        });
    } catch (error) {
        res.status(500).json({message: "An error occurred."+ error});
    }
}