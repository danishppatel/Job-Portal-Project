import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { json, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";

let response,d1,deg;


const JobSeekerForm = () => {
    const navigate = useNavigate();

    const [defaultValue, setDefaultValue] = useState("")
    // const [fillupField ,setfillupField] = useState({
    //   mobileNumber:'',
    //   employmentType:'',
    //   jobPost:'',
    //   profileImage:''
    // })

    // console.log("fillup field ::  " ,fillupField);

    // const handleFillUp = (e)=>{
    //   const {name , value} =  e.target;
    //   setfillupField({...fillupField, [name] :value});
    // }
  const [name,setName] = useState("");
    useEffect(() => {
        const fetchDataFromApi = async () => {
          try {
            // console.log("hello")
            response = await fetch("http://localhost:3000/data");
            d1 = await response.json();
           
            setDefaultValue(d1);
            // console.log(deg)
          } catch (error) {
            console.error("Error fetching data from API:", error);
          }
        };
    
      fetchDataFromApi()
      
      setTimeout(() => {
        reset({
          achievement: defaultValue.achievement || '',
          name: defaultValue.name || '',
          education: defaultValue.education || '',
          email: defaultValue.email || '',
          experience: defaultValue.experience || '',
          project: defaultValue.project || '',
          
        });
        setName(defaultValue.name)
      }, 7000);
  
      }, [defaultValue]);
      
  const hanedleChange = (e)=>{
  
    setName(e.target.value)
    reset({name:e.target.value})

  }
    
  const [SelectedOption, setSelectedOption] = useState(null);
  
  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Modify the form data here
    data.skills = SelectedOption;

    // Log the modified data
  

    try {
      // Send the modified data to the server
      const response = await fetch('http://localhost:3000/post-jobSeeker', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      
    } catch (error) {
      console.error("Error submitting form data:", error);
    }

    // Reset form or navigate to another page if needed
    setSelectedOption(null);
    navigate(`/`);
  };
  let counter=0;
  const handleModify = async(data) =>{
    function generateUniqueId() {
      const timestamp = Date.now().toString(36); // Convert timestamp to base36 string
      const randomString = Math.random().toString(36).substr(2, 5); // Generate random string
      const uniqueInfo = counter.toString(36); // Convert counter to base36 string
      counter++;
      return timestamp + randomString + uniqueInfo;
    }
    
   
    
    try {
      data.id = generateUniqueId();
      console.log(data);
      
      // Send the modified data to the server
      const response = await fetch('http://localhost:3000/post-jobSeeker', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log("data",response);
    }catch(err){};

    try {

      // Send the modified data to the server
      const response = await fetch(`http://localhost:3000/jobseeker/id/${data.id}`).then(response=>response.json()).then(data=>{
        console.log("by email",data);
        navigate(`/modify-Jobseekerdata/${data[0]['_id']}`)
        return data;
      }).catch();

    }catch(err){};
   
   
  }


  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
    { value: "Python", label: "Python" },
  ];
  return (
    <div className="max-w-screen-2x1 container mx-auto x1:px-24 px-4">
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        {/* <h6 className="text-blue text-lg "> Post Job</h6> */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Name</label>
              <input
                type="text"
               
                placeholder="Ex:Patel Brij"
               value={name}
                name="name"
                onChange={hanedleChange}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Email</label>
              <input
                type="email" 
                // value={defaultValue.email}
                placeholder="Ex: abc@gmail.com"
                {...register("email")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* 2nd row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Mobile number</label>
              <input
                type="text"
                name="mobileNumber"
                // value={fillupField.mobileNumber}
                // onChange={handleFillUp}
                placeholder="Ex:-9856321420"
                {...register("mobileNumber")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Post</label>
              <input
                type="text"
                name="jobPost"
                // value={fillupField.jobPost}
                // onChange={handleFillUp}
                placeholder="Java Developer"
                {...register("jobPost")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* 5th raw */}
          <div>
            <label className="block mb-2 text-lg">Skill Sets</label>
            <CreatableSelect
              className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              value={SelectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
            >
              {" "}
            </CreatableSelect>
          </div>

          {/* 6 th row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Profile Image</label>
              <input
                type="url"
                name="profileImage"
                // value={fillupField.profileImage}
                // onChange={handleFillUp}
                placeholder="Paste Your Company Logo Url: https://weshare.com/"
                {...register("profileImage")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                {...register("employmentType")}
                name="employmentType"
                // value={fillupField.employmentType}
                // onChange={handleFillUp}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              >
                <option value="">Choose your Experience</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Internship">Internship</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>
          {/* 7 th row  */}

          <div className="w-full">
            <label className="block mb-2 text-lg">Experience</label>
            
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none"
              {...register("experience")}
              rows={6}
              placeholder={"hello"}
              value={defaultValue.experience }
            ></textarea>
          </div>
          {/* 8 th row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Education</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none"
              {...register("education")}
              rows={6}
              placeholder="Job Description"
              value={defaultValue.education}
            ></textarea>
          </div>
          {/* 9 th row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Achievement</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none"
              {...register("achievement")}
              rows={6}
              placeholder="Job Description"
              value={defaultValue.achievement}
              
            ></textarea>
          </div>
          {/* 10 th row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Projects</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none"
              {...register("project")}
              rows={6}
              placeholder="Job Description"
              value={  defaultValue.project }
            ></textarea>
          </div>

        
          <div className="flex flex-row ">
            <input
              type="submit"
              className="block mt-12 bg-blue text-white font-semibold px-8 py-2 mx-4 rounded-sm cursor-pointer "
            /> 

            <button 
              type="button"
              className="block mt-12 bg-blue text-white font-semibold  mx-4 px-8 py-2 rounded-sm cursor-pointer"
              onClick={handleSubmit(handleModify)}>
              Modify
            </button>
          </div>

          
        </form>
      </div>
    </div>
  );
};
export default JobSeekerForm;


