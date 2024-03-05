const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        trim:true
    },
    email:{
        type : String,
        required : true,
        unique :true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not valid Email");
            }
        }
    },
    password:{
        type : String,
        required : true,
        minLength:6
    },
    confirmPassword:{
        type : String,
        required : true,
        minLength:6
    },
    tokens:[
        {
            token :{
                type : String,
                required : true,
            }
        }
    ]

},{timestamps:true});

const users = new mongoose.model("users" , userSchema);

module.exports = users;
