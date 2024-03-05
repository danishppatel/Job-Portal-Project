import React from 'react'
import Button from './Button';
import InputField from '../Components/InputField';

function Salary({handleChange, handleClick}) {
  return (
    <div>
        <h4 className='text-lg font-medium mb-2'>Salary</h4>

        {/* <div className='mb-4'>
            <Button onClickHandler={handleClick} value="" title={"Hourly"}/>
            <Button onClickHandler={handleClick} value={"Monthly"} title={"Monthly"}/>
            <Button onClickHandler={handleClick} value={"Yearly"} title={"Yearly"}/>
        </div> */}

        <label className="sidebar-label-container mt-4">
          <input
            type="radio"
            name="salary"
            value="all"
            onChange={handleChange}
          />
          <span className="checkmark"></span>All
        </label>

        <InputField
          handleChange={handleChange}
          value={30}
          title="> 30000k"
          name="salary"
        />
        <InputField
          handleChange={handleChange}
          value={50}
          title="> 50000k"
          name="salary"
        />

        <InputField
          handleChange={handleChange}
          value={80}
          title="> 80000k"
          name="salary"
        />

        <InputField
          handleChange={handleChange}
          value={100}
          title="> 100000k"
          name="salary"
        />
       
       
        
    </div>
  )
}

export default Salary;