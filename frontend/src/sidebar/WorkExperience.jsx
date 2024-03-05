import React from 'react'
import InputField from '../Components/InputField'


function WorkExperience({handleChange}) {
  return (
    <div>
    <h4 className="text-lg font-medium mb-2">Work Experience</h4>

    <div>
      <label className="sidebar-label-container">
        <input
          type="radio"
          name="work_experience"
          id="work_experience"
          value="all"
          onChange={handleChange}
        />
        <span className="checkmark"></span>Any Experience
      </label>

      <InputField
        handleChange={handleChange}
        value="No Experience"
        title="Fresher"
        name="work_experience"
      />

      <InputField
        handleChange={handleChange}
        value="internship"
        title="Internship"
        name="work_experience"
      />
      
      <InputField
        handleChange={handleChange}
        value="work remotely"
        title="Work remotely"
        name="work_experience"
      />
      
     
    </div>
  </div>
  )
}

export default WorkExperience