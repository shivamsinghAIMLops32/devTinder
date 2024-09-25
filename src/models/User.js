// models/User.js
const mongoose = require('mongoose');
const validator = require("validator");


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength:1,
        maxLength:50
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator(value){
            if(validator.isEmail(value)){
                throw new Error("email is not correct format")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validator(value){
            if(!validator.isStrongPassword(value)){
                    throw new Error("password is not correct");
            }
        }
    },
    age:{
        type : Number,
        required:true,
        min:18
    },
    skills :{
        type :[String]    // type is array of string
    },
    profilePic : {
       type: String,
       default: "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png",
       validator(value){
        if(!validator.isURL(value)){
            throw new Error("url of profile pic is wrong");
        }
       }
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'non-binary', 'other'], // Define enum options
        required: true
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // }
},{
    timestamps:true
});


const User = mongoose.model('User', userSchema);
module.exports = User;
