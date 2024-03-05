import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { json, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateJob = () => {
  const todos = useSelector((state)=>state.todos);
  const id =  useParams();

  const [selectedOption, setSelectedOption] = useState(null);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id !== undefined && id.hasOwnProperty('id')) {
          const response = await fetch(`http://localhost:3000/all-jobs/${id.id}`);

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          let data = await response.json();
          
          console.log("data is",data);
          reset({
            jobTitle: data.jobTitle,
            companyName: data.companyName,
            minPrice: data.minPrice,
            maxPrice: data.maxPrice,
            salaryType: data.salaryType,
            jobLocation: data.jobLocation,
            postingDate: data.postingDate,
            experienceLevel: data.experienceLevel,
            companyLogo: data.companyLogo,
            employmentType: data.employmentType,
            description: data.description,
            postedBy: data.postedBy,
            websiteLink:data.websiteLink,
            vacancy:data.vacancy,

          });
          const skillsArray = data.skills.map((skill) => ({ value: skill['value'], label: skill['label'] }));
          setSelectedOption( skillsArray)
          console.log(skillsArray);
         
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [id]);

  const onSubmit =  (data) => {
    
    //for posting a job
    if(id === undefined || Object.keys(id).length === 0){
    
      data.skills = selectedOption;
      data.postedBy = todos.userEmail;

      setSelectedOption(null);
  
      //Call Api
      fetch('http://localhost:3000/post-job', {
          method: 'POST',
          mode:"cors",
          headers :{
            "Content-Type" : 'application/json',
          },
          body : JSON.stringify(data)
      }).
      then(res => res.json()).
      then((result) => {
        if(result.acknowledged === true){
          toast.success('Job created successfully!')
        }
      }).
      catch(err=>console.log(err));
    }
    //for edit(update) jobs
    else{
      data._id = id['id'];
      data.skills = selectedOption;
      data.postedBy = todos.userEmail;
    
      fetch('http://localhost:3000/update-job', {
        method: 'POST',
        mode:"cors",
        headers :{
          "Content-Type" : 'application/json',
        },
        body : JSON.stringify(data)
      }).then(res=>res.json()).catch(err=>console.log(err));
    }

    reset({
      jobTitle: '',
      companyName: '',
      minPrice: '',
      maxPrice: '',
      salaryType: '',
      jobLocation: '',
      postingDate: '',
      experienceLevel: '',
      companyLogo: '',
      employmentType: '',
      description: '',
      postedBy: '',
      websiteLink:'',
      vacancy:'',
    });
    setSelectedOption(null)
  };

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
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                placeholder="Ex: Web Developer"
                {...register("jobTitle")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                placeholder="Ex: Microsoft"
                {...register("companyName")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* 2nd row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="text"
                placeholder="$20k"
                {...register("minPrice")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="text"
                placeholder="$120k"
                {...register("maxPrice")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* 3rd row */}

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select
                {...register("salaryType")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              >
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                placeholder="Ex: New York"
                {...register("jobLocation")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* 4 th raw */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                type="date"
                placeholder="Ex: 2023-11-03"
                {...register("postingDate")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                {...register("experienceLevel")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              >
                <option value="">Choose your Experience</option>
                <option value="No Experience">No Experience</option>
                <option value="Internship">Internship</option>
                <option value="Work Remotely">Work Remotely</option>
              </select>
            </div>
          </div>
          {/* 5th raw */}
          <div>
            <label className="block mb-2 text-lg">Required Skill Sets</label>
            <CreatableSelect
              className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              value={selectedOption || []}
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
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="url"
                placeholder="Paste Your Company Logo Url: https://weshare.com/"
                {...register("companyLogo")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                {...register("employmentType")}
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
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Website Link</label>
              <input
                type="text"
                placeholder="www.google.com"
                {...register("websiteLink")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Vacancy</label>
              <input
                type="text"
                {...register("vacancy")}
                placeholder="No. of Vacancy"
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* 8 th row  */}

          <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none"
              {...register("jobDescription")}
              rows={4}
              placeholder="Job Description"
              defaultValue={
                "is seeking a skilled Software Engineer to join our dynamic and innovative team. The ideal candidate should have a passion for software development, strong problem-solving abilities, and a collaborative mindset to contribute to our cutting-edge projects."
              }
            ></textarea>
          </div>
        
          {/* 9 th row  */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Company Description</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none"
              {...register("CompanyDescription")}
              rows={4}
              placeholder="Company Description"
              defaultValue={
                " The ideal candidate should have a passion for software development, strong problem-solving abilities, and a collaborative mindset to contribute to our cutting-edge projects."
              }
            ></textarea>
          </div>

          {/* Last raw */}
          {/* <div className="w-full ">
            <label className="block mb-2 text-lg">Job PostDated By</label>
            <input
              type="email"
              placeholder="your email"
              {...register("postedBy")}
              className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
            />
          </div> */}
          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer "
          />
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};
export default CreateJob;
