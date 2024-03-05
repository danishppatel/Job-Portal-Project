import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate= useNavigate();

  const [email,setEmail] =useState('');
  
  
  const dashboardValid = async () =>{
        
    // get usertoken from the localstorage
    let token = localStorage.getItem("usertoken");

    const data = await fetch('http://localhost:3000/validuser', {
      method: 'GET',
      mode:"cors",
      headers :{
        "Content-Type" : 'application/json',
        "authorization" :token
      },
    });
    
    const res = await data.json();

    const emailID = await res.validUserOne.email;
    const resAcknowledge =  await res.acknowledged;
    console.log("data :    ",res);

    if(resAcknowledge === "failed"  || !res){
          navigate('*')
    }else{
      setEmail(emailID);
    }

  } 
  
  useEffect(()=>{
    dashboardValid();
  },[])

  return (
   <>
     <div className='flex flex-col items-center'>
        <img src="/images/userDashboard.png" style={{width:"200px", marginTop:20}} alt="userDashBoard" />
       <div className='flex  sm: flex-col justify-center items-center'>
       <h1 className=' font-bold text-3xl mt-2 '>User Email : </h1>
        <h1 className=' font-bold text-3xl mt-2 '>{email} </h1>
       </div>
     </div>
   </>
  )
}

export default Dashboard