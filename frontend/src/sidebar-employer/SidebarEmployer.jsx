import React from 'react'
import { IoFilterSharp } from "react-icons/io5";
import JobTitle from './JobTitle';




function SidebarEmployer({handleChange, handleClick}) {
  return (     
        <div className='space-y-5'>
            <div className='flex gap-2'>
                <span className='flex items-center gap-1'><IoFilterSharp/></span>
                <p className='font-bold m-2'>Filter Jobs</p>
            </div>

           <JobTitle  handleChange = {handleChange}/>

        </div>
  )
}

export default SidebarEmployer;