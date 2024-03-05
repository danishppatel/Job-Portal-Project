import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const AppliedJob = ()=>{
    // const e = useParams();
    

    const[jobs,setjobs] = useState([])
    const [searchText,setSearchText] = useState("")
    const [isLoading,setIsLoading]=useState(true);

    //set current page
    const [currentPage,setCurrentPage] = useState(1);
    const itemsPerPage =4;
    //redux
    const todos = useSelector(state=>state.todos);
  
    useEffect(()=>{
        let jobList=[];

        setIsLoading(true)
        
        fetch(`http://localhost:3000/applied-jobs/${todos.userEmail}`).then((res) => res.json())
        .then((data) => {
        //   console.log("i am at useEffect",data);
          jobList= data;
          fetch(`http://localhost:3000/get-Jobs/${jobList}`).then((res) => res.json())
          .then((data) => {
          //   console.log("i am at useEffect",data);
            setjobs(data); // Set the jobs state with the fetched data
            setIsLoading(false);
          })
       
        })
    },[todos])

    // // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem =indexOfLastItem -itemsPerPage;

    const currentJobs =jobs.slice(indexOfFirstItem ,indexOfLastItem);
    //next button and previous button
    const nextPage = ()=>{
        if(indexOfLastItem < jobs.length){
          setCurrentPage(currentPage + 1)
        }
    }

    const previousPage = ()=>{
      if(currentPage > 1){
        setCurrentPage(currentPage - 1)
      }
    }


    const  handleSearch =()=>{
        const filter = jobs.filter(  (job) => 
                      job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 );

        // console.log(filter);
        setjobs(filter);
        setIsLoading(false);
    }

    const handleDelete = async(id)=>{
      let jobid="";
      await fetch(`http://localhost:3000/applied-jobs/getOne/${id}`).then(res=>res.json()).then(data=>{
        console.log(data);
        id = data._id
      })

      fetch(`http://localhost:3000/applied-jobs/${id}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
       
      }).then(Response=>Response.json()).then(data=>{
        console.log(data);
      })
    }

    return (
        <div className=" bg-[#FAFAFA] max-w-screen-2x1 container mx-auto x1:px-24 px-4">
            <div className="my-jobs-container ">
                <h1 className="text-center p-4">ALL My Jobs</h1>
                <div className="search-box p-2 text-center mb-2">
                    <input type="text" name="search" id="search" className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full" onChange={(e)=>{setSearchText(e.target.value)}} />
                    <button className="bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4" onClick={handleSearch}>Search</button>
                </div>
            </div>

            {/* table */}
            <section className="py-1 bg-[#FAFAFA]">
              <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-blueGray-700">All Jobs</h3>
                      </div>
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                      <Link to="/post-job">
                        <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none fo cus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"> Post A New </button> </Link>
                      </div>
                    </div>
                  </div>

                  <div className="block w-full overflow-x-auto">
                    <table className="items-center bg-transparent w-full border-collapse ">
                      <thead>
                        <tr>
                          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        No.
                                      </th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        TITLE
                                      </th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        COMPANY NAME
                                      </th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        SALARY
                                      </th>
                        
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"  >
                                        DELETE
                                      </th>
                        </tr>
                      </thead>

                       {
                        isLoading? (<div className="flex items-center justify-center h-20"><p>Loading...</p></div>) :
                         (  
                           <tbody>
                            { 
                                currentJobs.map((job,index)=>{
                                  return (
                                    <tr key={index}>
                                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                        {index+1}
                                      </th>
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                      {job.jobTitle}
                                      </td>
                                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {job.companyName}
                                      </td>
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                          ${job.minPrice}-${job.maxPrice}
                                      </td>
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <button onClick={()=>{
                                        
                                          handleDelete(job._id)}} className="bg-red-700 py-2 px-6 text-white rounded-sm">DELETE</button>
                                      </td>
                                    </tr>
                                  )
                                })
                            }
                              
                          </tbody>
                          )
                       }
                   
                    </table>
                  </div>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex justify-center text-primary space-x-8 mb-8">
                  {
                    currentPage > 1 && (
                      <button className="hover:underline" onClick={previousPage}>Previous</button>
                    )
                  }
                  {
                    indexOfLastItem < jobs.length && (
                      <button className="hover:underline" onClick={nextPage}>Next</button> 
                    )
                  }
              </div>
          </section>
           
        </div>
    )
}
export default AppliedJob;