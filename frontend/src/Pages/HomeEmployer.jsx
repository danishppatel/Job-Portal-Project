import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";

import CardUsers from "../Components/CardUsers";
import Applicants from "./Applicants";
import { useSelector } from "react-redux";
import { Await, useNavigate } from "react-router-dom";
import SidebarEmployer from "../sidebar-employer/SidebarEmployer";


function HomeEmployer() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]); //  as json array object
  const [jobSeekers, setJobSeekers] =  useState([]); // as json array object
  const [isLoading, setIsLoading] = useState(true);
  const [currentPageForApplicant, setCurrentPageForApplicant] = useState(1);
  let filterData = {
    jobTitle:'all'
  }
  const [filter,setFilter] = useState(filterData);
  const itemsPerPage = 6;
  
  const todos = useSelector((state)=>state.todos);
  
  
  let filteredJobs = []; //extract those which are not apllied by jobseeker
  let user = useSelector(state=>state.todos)
  console.log("user :  ", user)
  let navigate = useNavigate();
  useEffect(()=>{
    if(user.userEmail ===''){
      navigate('/login');
    }
  },[])

  
  
 
 
  // JobSeekers - for Employer
  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3000/all-jobSeeker/email/${todos.userEmail}`)
      .then((res) => res.json())
      .then((data) => {

        setJobSeekers(data);
        setIsLoading(false);
      });
  }, []);

  //------------------------------------------------For jobseekers--------------------------------------------

  // For Banner Components
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  //Filter the jobs by title
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  //--------------------Radio filtering-----------------------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    setFilter({...filter,[event.target.name]:event.target.value});
    console.log(filter);
   
  };

  //--------------------Button based filtering-----------------------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
    
  };

  

  //main function
 



  //----------------------------------------------------For Employer-----------------------------------------------------------

  const noOfJobseeker = jobSeekers.filter(
    (jobSeekerData) => jobSeekerData
    // .jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );


  const calculatePageRangeForEmployer = () => {
    const startIndex = (currentPageForApplicant - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return { startIndex, endIndex };
  };

  //function for the next phase
  const nextPageForEmployer = () => {
    if (currentPageForApplicant < Math.ceil(jobSeekers.length / itemsPerPage)) {
      setCurrentPageForApplicant(currentPageForApplicant + 1);
    }
  };

  //function for the previous phase
  const previousPageForEmployer = () => {
    if (currentPageForApplicant > 1) {
      setCurrentPageForApplicant(currentPageForApplicant - 1);
    }
  };

  //Applicant Details
  const applicantList = (jobSeekers) =>{
   
    // HERE IS FILTER
    let jobseekerList = jobSeekers;
    if(jobSeekers){
      jobseekerList =  jobSeekers.filter(({jobPost})=>{
        if(filter.jobTitle === 'all' ||filter.jobTitle.toLowerCase() === jobPost.toLowerCase()){
          return true;
        }
        return false;
      })
    }
    
    const { startIndex, endIndex } = calculatePageRangeForEmployer();

    jobseekerList = jobseekerList.slice(startIndex, endIndex);

    return jobseekerList.map((data, i) => <CardUsers key={i} data={data} />);
  }

  const jobseeker = applicantList(jobSeekers); //call , gives me list of job.seekers application for particular company, now it gives all the jobseekers application, changes it


  return (
    <div>

      {/* passed as props  */}
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/* left side */}
        <div className="bg-white p-4 rounded">
          <SidebarEmployer  data = {jobSeekers} handleChange={handleChange} handleClick={handleClick} />

        </div>  
          <div className="col-span-3 bg-white p-4 rounded-sm">
            {isLoading ? (
              <p className="font-medium">Loading...</p>
            ) : jobseeker.length > 0 ? (
              <Applicants result={jobseeker} />
            ) : (
              <>
                <h3 className="text-lg font-bold mb-2">
                  {jobseeker.length} Applicant List
                </h3>
                <p>No data found!</p>
              </>
            )}

            {/* pagination here */}
            {jobseeker.length > 0 ? (
              <div className="flex justify-center mt-4 space-x-8">
                <button
                  onClick={previousPageForEmployer}
                  className="hover:underline"
                  disabled={currentPageForApplicant === 1}
                >
                  Previous
                </button>
                <span className="mx-2">
                  Page {currentPageForApplicant} of{" "}
                  {Math.ceil(noOfJobseeker.length / itemsPerPage)}{" "}
                </span>
                <button
                  onClick={nextPageForEmployer}
                  className="hover:underline"
                  disabled={
                    currentPageForApplicant ===
                    Math.ceil(noOfJobseeker.length / itemsPerPage)
                  }
                >
                  Next
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
       

      </div>
    </div>
  );
}

export default HomeEmployer;
