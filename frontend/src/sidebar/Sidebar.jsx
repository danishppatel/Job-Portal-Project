import React from 'react'
import { IoFilterSharp } from "react-icons/io5";
import Location from './Location';
import Salary from './Salary';
import JobPostingData from './JobPostingData';
import WorkExperience from './WorkExperience';
import EmploymentType from './EmploymentType';


function Sidebar({handleChange, handleClick}) {
  return (     
        <div className='space-y-5'>
            <div className='flex gap-2'>
                <span className='flex items-center gap-1'><IoFilterSharp/></span>
                <p className='font-bold m-2'>Filter Jobs</p>
            </div>

            <Location handleChange={handleChange} />
            <Salary handleChange={handleChange} handleClick={handleClick}/>
            <JobPostingData handleChange={handleChange}/>
            <WorkExperience handleChange={handleChange}/>
            <EmploymentType handleChange={handleChange}/>

        </div>
  )
}

export default Sidebar;