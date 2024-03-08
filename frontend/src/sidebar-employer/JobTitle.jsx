import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const JobTitle = ({handleChange}) => {
   let todos = useSelector(state =>state.todos);
   const [list,setList] = useState([]);
        useEffect(()=>{
            
           
            fetch(`http://localhost:3000/my-jobs/${todos.userEmail}`).then((res) => res.json())
            .then((data) => {
                console.log(data);
           setList(data);
              
            })
        },[])
  
  return (
    <div className="flex flex-col ml-4 mr-4">
  
    <div className='w-full'>
      <select  onChange={handleChange}
        className='border sm:w-full rounded py-2 px-4  mb-6'
        name='jobTitle'
        id='jobTitle'
      >
        <option value='all' >All</option>
        {   
        
            list.map((x,i)=>{
               
  return(<option  key ={i} value={`${x.jobTitle}`}> {x.jobTitle}</option>)
            })
        }
       
        
      </select>
    </div>
    </div>
  )
}

export default JobTitle