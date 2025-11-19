const jwt = require("jsonwebtoken");
const bcrypt= require("bcryptjs");
const User = require('../Model/authModel');


exports.registerUser = async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name,!email,!password) return res.status(400).json({Message:"Name,Email and Password are required"});

        const existing= await User.findOne({email});
        if(existing) return res.status(209).json({Message:"Email already Registered"});

        const salt= await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password ,salt);

        const user = await  User.create({name,email,password:hashed});
        res.json({User:{id:user._id,name:user.name,password:user.password}});

    } catch(err){
        res.status(500).json({Message:err.message});
    }
};
exports.deleteUser = async(req,res)=>{
    try{
        const userDelete = await User.findByIdAndDelete(req.params.id);
        if(userDelete) return res.status(200).json({Message:"Deleted Successfull"});
    } catch(err){
        res.json({Message:err.message});

    }
};
exports.loginUser =  async(req,res)=>{
    try{
        const {email,password}= req.body;
        if(!email || !password) return res.status(400).json({message:"Email ans Password are require"});

        const user = await User.findOne({email});
        if(!email) return res.status(401).json({Message:"Invalid Credentials"});
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(401).json({Message:"Invalid Credentials"});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
        res.json({token,user:{id:user._id,name:user.name, email:user.email, password:user.password}});

    } catch(err){
        res.status(500).json({Message:"Server Error "});
    }
};
exports.getUser = async(req,res)=>{
    const users = await User.find();
    const count = await User.countDocuments();
    res.json({users:{count,
        user:users
    }});
};
exports.putUser = async(req,res)=>{
    try{
        const userUpdate = await User.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        });
        if(userUpdate) return res.json({Message:"User update Successfully",
            user:userUpdate
        });

    } catch(err){
        return res.json({Message:err.message});
    }
};
