const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    user:{
        type:String,
        enum:['reader' , 'admin' , 'author']
    } ,

    phone:{
        type:Number,
        required:true
    } 
    

 })




//create user model 
const User=mongoose.model('User',userSchema);

module.exports=User;