import React from 'react';
import InputField from "../Components/InputField";

function JobPostingData({handleChange}) {
    //get date
    const now =  new Date();
    // console.log(now)

    const twentyFourHoursAgo = new Date(now - (24 * 60 * 60 * 1000)) 
    const SevenDaysAgo = new Date(now - (7 * 24 * 60 * 60 * 1000)) 
    const ThirtyDaysAgo = new Date(now - (30 * 24 * 60 * 60 * 1000)) 
    // console.log(twentyFourHoursAgo, now)

    //- Convert date into String
    const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0,10);
    const SevenDaysAgoDate = SevenDaysAgo.toISOString().slice(0,10);
    const ThirtyDaysAgoDate = ThirtyDaysAgo.toISOString().slice(0,10);
    console.log(twentyFourHoursAgoDate ,typeof ThirtyDaysAgoDate)

  return (
    <div>
    <h4 className="text-lg font-medium mb-2">Date of posting</h4>

    <div>
      <label className="sidebar-label-container">
        <input
          type="radio"
          name="date_of_posting"
          // id="date_of_posting"
          value="all"
          onChange={handleChange}
        />
        <span className="checkmark"></span>All time
      </label>

      <InputField
        handleChange={handleChange}
        value={twentyFourHoursAgoDate}
        title="Last 24 Hours"
        name="date_of_posting"
      />
      
      <InputField
        handleChange={handleChange}
        value={SevenDaysAgoDate}
        title="Last 7 Days"
        name="date_of_posting"
      />
      
      <InputField
        handleChange={handleChange}
        value={ThirtyDaysAgoDate}
        title="Last Month"
        name="date_of_posting"
      />
    </div>
  </div>
  )
}

export default JobPostingData