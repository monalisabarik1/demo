const mongoose= require("mongoose");
const User = require('./authModel');
const category = new mongoose.Schema({
 name:{type:String, required:true},
 createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:User,
    required:true,
 }
},{
    timestamps:true,
}
);

module.exports = mongoose.model("Category",category);