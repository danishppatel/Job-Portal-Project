const express = require("express");
require("dotenv").config();
const axios = require('axios')
const FormData = require('form-data')
const multer =  require('multer')
const upload = multer()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser =  require('cookie-parser')
const jwt = require('jsonwebtoken');
const passport  =require('passport');
const OAuth2Strategy = require('passport-google-oauth2').Strategy;


const port = process.env.PORT | 3000;

const clientId  ="904033972924-8ejo8mlp2a42lr04rhi29nl1lsm9mbjj.apps.googleusercontent.com";
const clientSecret = "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"

//middlewars
app.use(cors({
  origin:"http://localhost:5173",
  methods:"GET, POST, PUT, DELETE",
  credentials:true
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

//backend code for resume parsing
const apiUrl = 'http://127.0.0.1:5000/api/data/pdf';

let b = {
  email: "",
  name: "",
  education: "",
  achievement: "",
  project: "",
  skill: "",
  experience:"",
};

let a = [
  "What email: student's email",
  "Name of the student:",
  "Student's education: give direct ans which given in pdf ",
  "Student's achievements: give direct ans which given in pdf",
  "student's projects: give direct ans which given in pdf",
  "student's skills: give direct ans which given in pdf",
  "student's experience: give direct ans which given in pdf"
];

let c = ["email", "name", "education", "achievement", "project", "skill","experience"];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchData(fileData) {
  for (let i = 0; i < a.length; i++) {
    console.log("start");

    try {
      const formData = new FormData();
      formData.append('file', fileData, {
        filename: 'Nevil_Resume.pdf',
        contentType: 'application/pdf',
      });

      formData.append('data', a[i]);

      const apiResponse = await axios.post(apiUrl, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      console.log('File sent successfully to the API');
      console.log('Response:', apiResponse.data);
      b[c[i]] = apiResponse.data.message;

    } catch (error) {
      console.error('Error:', error.message);
    }

    console.log("end");
    await delay(20000);
  }

}




// -----------------------------------------------------------------------------------------------------


//setup session
// app.use(session({
//   secret : "u23hdns71hgdp2003rths39e",
//   resave: false,
//   saveUninitialized :true
// }))

// // setup passport
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(
//     new OAuth2Strategy({
//       clientID :clientId,
//       clientSecret :clientSecret,
//       callbackURL :"/auth/google/callback",
//       scope:["profile","email"]
//     }, 
//     //  async function
//     async(accessToken , refreshToken , profile , done)=>{
//       console.log(profile);
//         try {
//           let user = await userdb.findOne({googleId :profile.id}).exec();

//              if(!user){
//                 user  =  new userdb({
//                   googleId :profile.id,
//                   displayName : profile.displayName,
//                   email : profile.emails[0].value,
//                   image : profile.photos[0].value
//                 })

//                 await user.save();
//              }

//         }catch (err) {
//             return done(err,null);
//         }
//     })
// )

// passport.serializeUser((user, done) => {
//   done(null,user);
// });

// passport.deserializeUser((user, done) => {
//   done(null,user);
// });

// //initial google auth login
// app.get('/auth/google', passport.authenticate("google", {scope:["profile","email"]}))

// app.get('/auth/google/callback', passport.authenticate("google", {
//   successRedirect:"http://localhost:5173",
//   failureRedirect:"http://localhost:5173/login"
// }))



// ----------------------------------------------
const uri = process.env.DATABASEURL;

// Create a MongoClient instance
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    // Get a reference to the database and collection
    const db = client.db("mernJobPortal");

    //mongodb table(collection)
    const jobCollection = db.collection("demoJobs");
    const users = db.collection("users");
    const jobSeeker = db.collection("jobSeeker");
    const application = db.collection("application");
    const appliedJobs = db.collection("appliedJobs");

    // Start the Express server only after the DB connection is established
    startServer(jobCollection, users,jobSeeker, application, appliedJobs);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

function startServer(jobCollection ,users, jobSeeker, application, appliedJobs) {
  
  //------------------------------------for Job-----------------------------------------------
  // Routes
  app.post("/post-job", async (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).json({ error: 'Invalid request body' });
    }
    body.createAt = new Date();
    console.log(body);

    try {
      const result = await jobCollection.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({ message: "Cannot insert. Try again later", status: false });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.get("/all-jobs", async (req, res) => {
    try {
      const jobs = await jobCollection.find({}).toArray();
      res.send(jobs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/all-jobs/:id", async (req, res) => {
    try {
      const id =  req.params.id;
      const job = await jobCollection.findOne({_id : new ObjectId(id)});
      // console.log(job);
      res.send(job);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/get-Jobs/:jobList", async (req, res) => {
    let jobList = req.params.jobList;
    let jobLists = jobList.split(',');

    // Use Promise.all to wait for all promises to resolve
    try {
        let jobs = await Promise.all(jobLists.map(async (x) => {
            return await jobCollection.findOne({ _id: new ObjectId(x) });
        }));

        // console.log(jobs);
        res.status(200).send(jobs);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

  app.delete("/delete-job/:id",async(req,res)=>{
    const id = req.params.id
  });
  
  //get jobs by mail
  app.get("/my-jobs/:email",async(req,res)=>{

    let jobs = await jobCollection.find({postedBy:req.params.email});
    // console.log("\n\nposted jobs for particular user length\n\n", jobs.length);
      jobs = await jobs.toArray()
    res.send(jobs);
  })

  //update a job
  app.post("/update-job",async(req,res)=>{
    let body = req.body;
    // console.log(body);

    const updateFields = {
      jobTitle: req.body.jobTitle,
      companyName: req.body.companyName,
      minPrice: req.body.minPrice,
      maxPrice: req.body.maxPrice,
      salaryType: req.body.salaryType,
      jobLocation: req.body.jobLocation,
      postingDate: req.body.postingDate,
      experienceLevel: req.body.experienceLevel,
      companyLogo: req.body.companyLogo,
      employmentType: req.body.employmentType,
      description: req.body.description,
      postedBy: req.body.postedBy,
      skills:req.body.skills,
      websiteLink : req.body.websiteLink,
      vacancy:req.body.vacancy
    };
     jobCollection.updateOne({_id :new ObjectId(body._id)},{$set:updateFields})
  })

   //delete a job
  app.delete("/job/:id",async(req,res)=>{
    const id = req.params.id;
   
    const result = await  jobCollection.deleteOne({_id: new ObjectId(id)})
    res.send(result);
  })


  //------------------------------------for Users-----------------------------------------------
  app.post("/sign-up" ,async (req, res)=>{
    // console.log(req.body)

    const {name ,email, password ,confirmPassword} = req.body;

    if(!name || !email || !password || !confirmPassword){
        res.status(400).json({error: "Fill all the Details"})
    }

    // check previosuser in database,
    try{
   
        const preUser = await users.findOne({email : email});

        if(preUser){
           res.status(404).json({error: "This Email-ID is already exist."})
        }else if(password !== confirmPassword){
          res.status(404).json({error: "Password and Confirm Password Not Match."})
        }else{
          // hash the password
          const salt =  await bcrypt.genSalt(8);
          const hashPassword = await bcrypt.hash(password,salt);

          const finalUser = await users.insertOne({name:name, email:email, password:hashPassword ,tokens:[{token:""}]}); //stored in database
          
          
          //find saved user in db
          const saved_user = await users.findOne({email : email});
           
          
          if (finalUser.insertedId) {
              //Geneate JWT Token
              const token = jwt.sign({userID: saved_user._id} , process.env.JWT_SECRET_KEY, {expiresIn : '1d'})
            
             res.status(201).json({message: "Registration successful!", status: "success" ,token : token});
             
          } else {
             res.status(404).json({error: "Cannot insert User. Try again later", status: "failed" });
          }
        }

    } catch(err){
          res.status(500).json({error: "This is error..." +err.message });
    } 

  })

  app.post("/login" ,async (req, res)=>{
      const {email, password} = req.body;

      if(!email || !password){
        res.status(400).json({error: "Fill all the Detail"})
      }

      try {
        const userValid = await users.findOne({email : email});

        if(userValid != null){
           const isMatch =  await bcrypt.compare(password, userValid.password);

           if((userValid.email === email) && isMatch){
             //token genearate
             const token = jwt.sign({userID: userValid._id} , process.env.JWT_SECRET_KEY, {expiresIn : '1d'})
             userValid.tokens =userValid.tokens.concat({token :token});
             
             //append token
             await users.updateOne({email : userValid.email},{ $set: { tokens: userValid.tokens }} )
             
             const result = {
               userValid,
               token
              }
              
              res.status(201).json({message: "Successfully Logged in", acknowledged:"success", token:token, result});

           }else{
              res.status(400).json({error: "Email or Password is not Valid"})
           }
        }else{
          res.status(400).json({error: "You are not Registered User"})
        }
      }catch (err) {
         res.status(500).json({error: "This is error..." +err.message });
      }
  })

  //middleware 
  const authUser = async (req, res, next)=>{
    try {
        const token =  req.headers.authorization;
        
        //verify jwt token
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const rootUser =  await users.findOne({_id : new ObjectId(verifyToken.userID)});

        if(!rootUser){
          throw new Error('User Not Found');
        }

        req.token =  token;
        req.rootUser = rootUser;
        req.userId = verifyToken.userID;

        next();
       
    } catch (err) {
      res.status(401).json({message: "Unauthorized no token provided", acknowledged: "failed" })
    }

  }


  //validate user
  app.get('/validuser', authUser, async (req, res)=>{
    try {
       const validUserOne =  await users.findOne({_id :new ObjectId(req.userId)})
       res.status(201).json({message:"Verified User" ,acknowledged:"success",validUserOne})
      
    } catch (err) {
      res.status(401).json({error : err, acknowledged: "failed" })
    
    }
  })


  //resume parsing code
  app.get("/data",(req, res) => {
     res.send(b);
  });

  app.post("/data", upload.single('pdfFile'), (req, res) => {
    const pdfFile = req.file;
    
    if (!pdfFile) {
      return res.status(400).send('No PDF file uploaded.');
    }
    
    fetchData(pdfFile.buffer); // Use req.file.buffer instead of req.files.pdfFile.data

    res.send('Received data successfully.');
  });


  //------------------------------------for Job Seeker-----------------------------------------------
  app.post("/post-jobSeeker",async(req,res)=>{
   
    const body = req.body;
    if (!body) {
      return res.status(400).json({ error: 'Invalid request body' });
    }
    body.createAt = new Date();
    // console.log(body);

    try {
      const result = await jobSeeker.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({ message: "Cannot insert. Try again later", status: false });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
   }
  )
  
  app.get("/all-jobSeeker", async (req, res) => {
    try {
      const jobseeker = await jobSeeker.find({}).toArray();
      res.send(jobseeker);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.get("/all-jobSeeker/email/:email", async (req, res) => {
    try {
      let email = "danishpatel5113@gmail.com";
      const jobseeker = await application.find({companyMail:email}).toArray();
      let jobSeekerlist = [];
      for (const element of jobseeker) {
        let j = await jobSeeker.find({ email: element.email });
        j = await j.toArray();
        
        jobSeekerlist.push(...j);

    }
  
      // console.log(list.length);
   
      res.send(jobSeekerlist);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.get("/all-jobSeeker/:id", async (req, res) => {
    try {
      let id = req.params.id;
      const jobseeker = await jobSeeker.find({_id : new ObjectId(id)}).toArray();
      res.send(jobseeker);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/jobseeker/:email",async(req,res)=>{
    let jobs = await jobSeeker.find({email:req.params.email});
        jobs = await jobs.toArray()
        // console.log("JOBS---------",jobs);
      res.send(jobs);
  })
  app.get("/jobseeker/id/:id",async(req,res)=>{
    let jobs = await jobSeeker.find({id:req.params.id});
        jobs = await jobs.toArray()
        // console.log("JOBS---------",jobs);
      res.send(jobs);
  })

  app.put("/jobSeekerupdate/:email",async(req,res)=>{
    let {email} = req.params;
    const body = req.body;
   let a =  await jobSeeker.updateOne({email:email},{$set:body});
   console.log(a);
   res.send("updated");
  })
  //----------------------------------------Application-----------------------------------------

  //appicants appply detail table :  whenever applicant apply , then their data will submitted and stored.
  app.post("/post-application",async(req,res)=>{
   
    const body = req.body;
    if (!body) {
      return res.status(400).json({ error: 'Invalid request body' });
    }
    // body.createAt = new Date();
    console.log("got at post-application",body);

    try {

      const result = await application.insertOne(body);
      if (result.insertedId) {

        return res.status(200).send(result);
      } else {
        return res.status(404).send({ message: "Cannot insert. Try again later", status: false });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message});
    }
})


  //----------------------------------------Applied Jobs-----------------------------------------
  //appicants appply detail table :  whenever applicant apply , then it will stored the list of jobs.
  app.post("/post-applied-job",async(req,res)=>{
   
    const body = req.body;
    if (!body) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    console.log("got at applied job",body);

    try {

      const result = await appliedJobs.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({ message: "Cannot insert. Try again later", status: false });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message});
    }
})
app.get("/applied-jobs/getOne/:id",async(req,res)=>{
  let {id} = req.params;
  console.log('apply')
  try {
    let job  = await appliedJobs.findOne({id:id})
  
   console.log("applied job",job);
   res.send(job);
    
  } catch (error) {
    
  };
}) 

app.delete("/applied-jobs/:id",async(req,res)=>{

  let {id} = req.params;
 
  try{
    let resp = await appliedJobs.deleteOne({_id:new ObjectId(id)});
  
  }
  catch(err){
    console.log("error at delete applied id");
  }
 

})

// it gives list of company mail for particular jobseeker  
  app.get("/applied-jobs/:email", async (req, res)=>{
    try {
      let jobs =  await appliedJobs.find({email:req.params.email});
      let jobList = await jobs.toArray();
      
     let jobsList =  jobList.map((x)=>{
        return x.id;
      })
        return res.status(200).send(jobsList);
      
    } catch (err) {
      return res.status(500).json({ error: err.message});
    }
    
  })
 
  // Start Express server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}


connectDB();

