import React, { useEffect, useState } from 'react'
import {FiMapPin, FiCalendar} from 'react-icons/fi';
import {MdCurrencyRupee} from 'react-icons/md'
import { useSelector } from 'react-redux';
import { useParams ,Link} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let companyMail="";

function JobDetails() {

  const {id} = useParams();
  const [job, setJob] =useState([]);

  const todos = useSelector(state=> state.todos)

  const {companyName , companyLogo, jobTitle, minPrice, maxPrice,employmentType , postingDate, jobLocation ,jobDescription,companyDescription, experienceLevel, salaryType,vacancy, postedBy, websiteLink} = job;

  useEffect(() =>{
    fetch(`http://localhost:3000/all-jobs/${id}`).then((res) => res.json()).then((data) => setJob(data))
  },[todos])

  const handleApplySubmit = async(email) => {
         // Handle the submission logic here
        // console.log('Submitted email:', email);
        email = todos.userEmail;
        await  fetch(`http://localhost:3000/jobseeker/${todos.userEmail}`).then((res) => res.json()).then((data) => {
            console.log("here is the data",data)
            // data[0].companyMail=postedBy;
            
       ;
            let dataApplicant = {
                email: email,//indepent of useremail// this is the email  which comes from res
                companyMail :postedBy
            };
            console.log("dataApplicants",dataApplicant);
            fetch('http://localhost:3000/post-application', {
                method: 'POST',
                mode:"cors",
                headers :{
                    "Content-Type" : 'application/json',
                },
                body : JSON.stringify(dataApplicant)
            }).then(res=>res.json()).catch(err=>console.log(err))

            dataApplicant = {
                email: email,//indepent of useremail// this is the email  which comes from res
                id:id
            };
        console.log("applied job",dataApplicant);
            fetch('http://localhost:3000/post-applied-job', {
                method: 'POST',
                mode:"cors",
                headers :{
                    "Content-Type" : 'application/json',
                },
                body : JSON.stringify(dataApplicant)
            }).then(res=>res.json())
            .then(data => {
                    toast.success("Applied Successfully.")

            })
            .catch(err=>console.log(err));
            
       }).catch(err => {
        console.log("Error from outer api call",err)
       });    
    };

    const handleApplyNow = () => {
        // setIsPopupOpen(true);
        handleApplySubmit("brijpatidar@gmail.com")
    };

   
  return (

    <section className="relative z-10 overflow-hidden bg-[#FAFAFA] py-10 dark:bg-dark lg:py-[50px]">
        {/* { companyMail = postedBy} */}
        <div className='container'>
            <div className="flex flex-col lg:flex-row">
                {/* border-2 border-solid border-black */}
                <div className="w-full lg:w-3/5 lg:ml-28 md:ml-5 mb-8 lg:mb-0 bg-white ">
                    <div classnName="col-7xl lg:ml-12">
                        {/* <!-- job single --> */}
                        <div classnNameName="single-job-items mb-50">
                            <div className="job-items flex flex-row mt-6">
                                <div className="company-img company-img-details sm:ml-4">
                                    
                                    <img className='image-logo ml-2' src={companyLogo} alt="companylogo" /> 
                                        {/* image */}
                                </div>
                                <div className="job-tittle ml-6  ">
                                    <a href="#">
                                        <h4 className='text-2xl hover:text-blue'>{job.companyName}</h4>
                                    </a>
                                    <h3 className='font-light'>{jobTitle}</h3>
                                    <ul className='text-primary/70 text-base flex flex-wrap sm:gap-2 
                                    sm: mt-4 '>
                                        <li><span className='flex items-center gap-1'><FiMapPin/>{jobLocation}</span></li>
                                        <li><span className='flex items-center '><MdCurrencyRupee/>{minPrice}-{maxPrice}k</span></li>
                                        <li><span className='flex items-center gap-2'><FiCalendar/>{postingDate}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                          {/* <!-- job single End --> */}
                        <div className="mt-5 ml-6 mr-6 ">
                            {/* <!-- Small Section Tittle --> */}
                            <div className="text-black text-lg font-semibold">
                                <h5>Job Description</h5>
                            </div>
                            <p className='mt-3'>{jobDescription}</p>
                        </div>
                        <div className="mt-6  ml-6 mr-6 ">
                                {/* <!-- Small Section Tittle --> */}
                            <div className="text-black text-lg font-semibold">
                                <h4>Required Knowledge, Skills, and Abilities</h4>
                            </div>
                            <ul className=' mt-3'>
                                <li>System Software Development</li>
                                <li>Mobile Applicationin iOS/Android/Tizen or other platform</li>   
                            </ul>
                        </div>
                        <div className="mt-5 ml-6 mr-6 mb-10">
                                {/* <!-- Small Section Tittle --> */}
                            <div className="text-black text-lg font-semibold">
                                <h4>Education + Experience</h4>
                            </div>
                            <ul className=' mt-3'>
                               <li>{experienceLevel}</li>
                            </ul>
                        </div>
                      
                    </div>
                </div>

     
                <div className="w-full lg:w-2/5  md:ml-5 mb-8 lg:mb-0 bg-white"> 
                    <div className="col-4xl col-lg-4">
                        <div className="p-5 mt-5 ml-12 mr-12  border-2 border-solid border-gray-200">
                            {/* <!-- Small Section Tittle --> */}
                            <div className="text-black text-lg font-semibold">
                               <h4>Job Overview</h4>
                            </div>
                            <ul className='mt-4'>
                                <li className='flex justify-between mb-2'>Posted date : <span>{postingDate}</span></li>
                                <li className='flex justify-between mb-2'>Location : <span>{jobLocation}</span></li>
                                <li className='flex justify-between mb-2'>Vacancy : <span>{vacancy}</span></li>
                                <li className='flex justify-between mb-2'>Job nature : <span>{employmentType}</span></li>
                                <li className='flex justify-between mb-2'>Salary Type:  <span> {salaryType}</span></li>
                              
                            </ul>
                            <div className="items-link items-link2 f-right mt-6">
                                <Link to="#" className="btn"> <button className='btn' onClick={handleApplyNow}>Apply Now</button></Link>
                            </div>
                            {/* <ApplyPopup
                               isOpen={isPopupOpen}
                               onClose={() => setIsPopupOpen(false)}
                               onSubmit={handleApplySubmit}
                          /> */}
                        </div>

                        <div className="mt-5 ml-12 mr-12 mb-10">
                            {/* <!-- Small Section Tittle --> */}
                           <div className="text-black text-lg font-semibold">
                               <h4>Company Information</h4>
                           </div>

                            <p>{companyDescription}</p>
                            <ul  className='mt-4'>
                                <li><span className='font-medium'>Name:</span> {companyName} </li>
                                <li><span className='font-medium'>Web:</span>{websiteLink}</li>
                                <li><span className='font-medium'>Email:</span>{postedBy}</li>
                            </ul>
                       </div>
                    </div>

                </div>
               
            </div>
        </div>
        <ToastContainer/>
    </section>
  )
}

export default JobDetails;


