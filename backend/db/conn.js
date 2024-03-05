const mongoose =  require ('mongoose');

const DBURL = process.env.DATABASEURL;

mongoose.connect(DBURL ,{

})
.then(() =>  console.log("Connected to MongoDB"))
.catch(() => console.log("Error"));
