// const express = require("express");
// const router = express.Router();
// const User = require("../Model/authModel");
// const jwt = require("jsonwebtoken");
// const bcrypt=require("bcryptjs");

// // REGISTER A USER

// router.post('/register', async(req,res)=>{
//     try{
//         const {name,email,password}=req.body;
//         if(!name || !email || !password) return res.status(400).json({Message:"Name ,Email and Password are required"});

//         const existing = await User.findOne({email});
//         if(existing) return res.status(409).json({Message:"Email already Registered"});

//         const salt = await bcrypt.genSalt(10);
//         const hashed = await bcrypt.hash(password,salt);

//         const user = await User.create({name,email,password:hashed});

//         //generate token

//         const token = jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES_IN || '1d'});
//         res.status(201).json({token, user:{id:user._id,name :user.name, email:user.email}});

//     } catch(err){
//         res.status(500).json({Message:'server error'});
//     }
// });

// router.get('/',async(req,res)=>{
//     const users = await User.find();
//     res.json(users);
// })

// module.exports= router;





// const express=require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const bcrypt=require("bcryptjs");
// const User = require('../Model/authModel');

// router.post('/register',async(req,res)=>{
//     try{
//         const {name,email,password}= req.body;
//         if(!name || !email || !password) return res.status(400).json({Message:"Name,Email and Password are required"});

//         const existing= await User.findOne({email});
//         if(existing) return res.status(209).json({Message:"Email already Registered"});

//         const salt = await bcrypt.genSalt(10);
//         const hashed= await bcrypt.hash(password,salt);

//         const user = await User.create({name,email,password:hashed});

//         //  const token = jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES_IN || '1d'});
//         // res.status(201).json({token, user:{id:user._id,name :user.name, email:user.email}});
//         res.status(201).json({ user:{id:user._id,name :user.name, email:user.email}});

//     } catch(err){
//         res.status(500).json({Message: err.message});
//     }
// });

// router.get('/',async(req,res)=>{
//     const users = await User.find();
//     res.status(200).json(users);
// });
// router.get('/:id',async(req,res)=>{
//    try{
//      const user = await User.findById(req.params.id);
//    user? res.json(user):res.status(404).json({Message:"User not found"});

//    } catch(err){
//     return res.status(400).json({Message:err.message});
//    }
// });
// router.put('/:id',async(req,res)=>{
//     try{
//         const userUpdate= await User.findByIdAndUpdate(req.params.id,req.body,{
//         new:true,

//         });
//         if(userUpdate) return res.status(200).json(userUpdate);

//         } catch(err){
//             return res.status(400).json({Message:err.message});
//         }
//     }
// );
// router.delete('/:id',async(req,res)=>{
//     try{
//         const user = await User.findByIdAndDelete(req.params.id);
//         if(user){
//             return res.status(200).json({Message:"User Deleted Successfully",
//                 user:user
//             });
//         } else{
//             return res.status(404).json({Message:"User not found"});

//         }
//     }catch(err){
//         return res.status(500).json({Message: err.message});
//     }
// });

// router.post('/login',async(req,res)=>{
//     try{
//         const {email,password}=req.body;
//        if(!email || !password) return res.status(400).json({Message:"Email and Password are required"});

//        const user = await User.findOne({email});
//        if(!user) return res.status(401).json({Message:"Invalid Credentials"});

//        const isMatch = await bcrypt.compare(password,user.password);
//        if(!isMatch) return res.status(401).json({Message:"Invalid Credentials"});

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
//         res.json({token,user:{id:user._id,name:user.name}});
//     } catch(err){
//         res.status(500).json({Message:"Server Error"});
//     }
// })
// module.exports=router;




const express = require ("express");
const router = express.Router();
const {loginUser,registerUser,getUser,deleteUser,putUser}= require('../controller/authController');

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/',getUser);
router.put('/:id',putUser);
router.delete('/:id',deleteUser);

module.exports= router;