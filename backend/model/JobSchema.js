const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobTitle : String,
    companyName : String,
    minPrice : String,   
    maxPrice : String,    
    salaryType : String,    
    jobLocation : String,
    postingDate : String,
    experienceLevel : String,
    companyLogo : String,
    employmentType : String,
    description : String,
    postedBy : String,
    vacancy : String
    
},{timestamps:true});

const jobdb = new mongoose.model("demoJobs" , jobSchema);

module.exports = jobdb;
