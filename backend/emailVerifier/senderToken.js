const express = require("express");
const app =  express();
require("dotenv").config();

const nodemailer = require('nodemailer'); 
const jwt = require('jsonwebtoken'); 

const senderTokenFun = async (email, jwtToken)=>{
    
    const transporter = nodemailer.createTransport({ 
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: { 
            user: "21ituos082@ddu.ac.in", 
            pass: "gepy pivu dvav eskw"
        } 
    }); 
    
    const mailConfigurations = { 
        from: {
            name:'Job Ninja',
            address:'21ituos082@ddu.ac.in'
        }, 
        to: email, 
        subject: 'Verify Your JobNinja Account', 
          html:"<p>Hi User,</p><br/>"+ "<p>Thank you for creating an account on JobNinja! To ensure the security of your account and access to all the features on our platform, please verify your email address by clicking the following link:</p><br/>"+ "<a href=`http://localhost:3000/verify/"+jwtToken+"` >VERIFY</a>" + "<br/><br/><p>Once verified, you'll be able to log in to your JobNinja account.</p>"
        
     
    }; 
    
    transporter.sendMail(mailConfigurations, function(error, info){ 
        if (error) {
            console.error("Got error: \n ", error);
            return "failure";
        } 

        console.log('Email Sent Successfully\n'); 
        console.log(info); 
        return "success";
    });


}

module.exports.senderTokenFun = senderTokenFun;
