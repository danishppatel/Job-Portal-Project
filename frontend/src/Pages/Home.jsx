import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import Card from "../Components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import CreateJob from "./CreateJob";
import CardUsers from "../Components/CardUsers";
import Applicants from "./Applicants";
import { useSelector } from "react-redux";
import { Await, useNavigate } from "react-router-dom";
import Error from "./Error";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]); //  as json array object
  const [isLoading, setIsLoading] = useState(true);
  const [jobList,setJobList] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  let filterData = {
    location:"all",
    salary:'all',
    date_of_posting:'all',
    work_experience:'all',
    employment:'all',
  }
  const [filter,setFilter] = useState(filterData);
  const itemsPerPage = 6;
  
  const todos = useSelector((state)=>state.todos);
  
  
  let filteredJobs = []; //extract those which are not apllied by jobseeker
  let user = useSelector(state=>state.todos)

  let navigate = useNavigate();
  useEffect(()=>{
    if(user.userEmail ===''){
      navigate('/login');
    }
  },[])

  const selectedMode = localStorage.getItem("selectedMode");
  
  //Jobs- for jobseeker  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // console.log("here email",todos.userEmail);
        const appliedJobsRes = await fetch(`http://localhost:3000/applied-jobs/${todos.userEmail}`);
        const appliedJobsData = await appliedJobsRes.json();

        const jobsRes = await fetch("http://localhost:3000/all-jobs");
        const jobsData = await jobsRes.json();
        
        setJobs(jobsData);
        setJobList(appliedJobsData)
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
   
  };

  //--------------------Button based filtering-----------------------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
    
  };

  //calculate the index range of pages
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return { startIndex, endIndex };
  };

  //function for the next phase
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredJobs.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  //function for the previous phase
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //main function
  const filteredData = (jobs, selected, query) => {
    let f = false;
    
    // display only those which are not applied by jobseeker
    jobs.map((x)=>{
        f = false;

        jobList.forEach((id)=> {
          if(id === x._id){
            f = true;
          }
        })
        
        if(f === true){
           return null;
        }
        else{
          filteredJobs.push(x);
          return x;
        }
    })
 
    // input items wise filtering ( based on jobTitle)
    if (query) {
      filteredJobs = filteredItems;
    }

    // category wise filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          minPrice,
          salaryType,
          experienceLevel,
          employmentType,
          postingDate,
        }) =>
   
          ((jobLocation.toLowerCase() === filter.location.toLowerCase()|| filter.location === 'all')
          &&( parseInt(maxPrice) > parseInt(filter.salary) || filter.salary === 'all')
          &&(experienceLevel.toLowerCase() === filter.work_experience.toLowerCase()|| filter.work_experience === 'all') &&(employmentType.toLowerCase() === filter.employment.toLowerCase()|| filter.employment === 'all') && (postingDate  > filter.date_of_posting|| filter.date_of_posting === 'all'))
       
      );
    }

    // slice the data based on current page
    const { startIndex, endIndex } = calculatePageRange();

    let  filteredJobs1 = filteredJobs.slice(startIndex, endIndex);
    // console.log("after slice",filteredJobs1);
   
    return filteredJobs1.map((data, i) =>   <Card key={i} data={data} /> );
  };

  // result
  const result = filteredData(jobs, selectedCategory, query);  //call

  return (
    <div>

      {/* passed as props  */}
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/* left side */}
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/* -----------------------------------------------job card-------------------------------------------------------- */}


          <div className="col-span-3 bg-white p-4 rounded-sm">
            {isLoading ? (
              <p className="font-medium">Loading...</p>
            ) : result.length > 0 ? (
              <Jobs result={result} />
            ) : (
              <>
                <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
                <p>No data found!</p>
              </>
            )}

            {/* pagination here */}
            {result.length > 0 ? (
              <div className="flex justify-center mt-4 space-x-8">
                <button
                  onClick={previousPage}
                  className="hover:underline"
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="mx-2">
                  Page {currentPage} of{" "}
                  {/* {Math.ceil(filteredItems.length / itemsPerPage)}{" "} */}
                  {Math.ceil(filteredJobs.length / itemsPerPage)}{" "}
                  
                </span>
                <button
                  onClick={nextPage}
                  className="hover:underline"
                  disabled={
                    currentPage ===
                    Math.ceil(filteredJobs.length / itemsPerPage)
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

export default Home;
