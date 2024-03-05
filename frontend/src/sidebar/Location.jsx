import React from "react";
import InputField from "../Components/InputField";

function Location({ handleChange }) {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Job Location</h4>

      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="location"
            id="location"
            value="all"
            onChange={handleChange}
          
          />
          <span className="checkmark"></span>All
        </label>

        <InputField
          handleChange={handleChange}
          value="london"
          title="London"
          name="location"
        />
        
        <InputField
          handleChange={handleChange}
          value="san Francisco"
          title="San Francisco"
          name="location"
        />
        
        <InputField
          handleChange={handleChange}
          value="banglore"
          title="Banglore"
          name="location"
        />
        
        <InputField
          handleChange={handleChange}
          value="Boston"
          title="Boston"
          name="location"
        />
        <InputField
          handleChange={handleChange}
          value="Mahesana"
          title="Mahesana"
          name="location"
        />
      </div>
    </div>
  );
}

export default Location;
