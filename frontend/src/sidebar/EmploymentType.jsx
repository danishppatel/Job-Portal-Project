import React from 'react'
import InputField from '../Components/InputField'

function EmploymentType({handleChange}) {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2"> Type of employment</h4>

      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="employment"
            id="employment"
            value="all"
            onChange={handleChange}
          />
          <span className="checkmark"></span>All
        </label>

        <InputField
          handleChange={handleChange}
          value="full-time"
          title="Full-time"
          name="employment"
        />
        
        <InputField
          handleChange={handleChange}
          value="temporary"
          title="Temporary"
          name="employment"
        />
        
        <InputField
          handleChange={handleChange}
          value="part-time"
          title="Part-time"
          name="employment"
        />
        <InputField
          handleChange={handleChange}
          value="Internship"
          title="Internship"
          name="employment"
        />
    
      </div>
    </div>
  )
}

export default EmploymentType