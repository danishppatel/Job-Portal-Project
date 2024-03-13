import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function JobseekerInfo() {

    const {id} = useParams();

    const [jobSeekerInfo, setJobSeekerInfo] =useState([]);

    const {name , email, mobileNumber, jobPost, profileImage, employmentType, experience, education, achievement, project, createAt,skills} = jobSeekerInfo;

    useEffect(() =>{
        fetch(`http://localhost:3000/all-jobSeeker/${id}`).then((res) => res.json()).then((data) => {setJobSeekerInfo(data[0]);})
      },[])

  return (
    <section className="relative z-10 overflow-hidden bg-[#FAFAFA] py-8 dark:bg-dark lg:py-[50px]">
     <h2 className=" text-3xl mt-2 mb-3 text-center text-gray-500 font-bold tracking-wide underline decoration-2 decoration-gray-400 underline-offset-2"> Job Seeker Details</h2>
    <div className='container'>
        <div className="flex flex-col lg:flex-row">
            {/* border-2 border-solid border-black */}
            <div className="w-full lg:w-1/2 lg:ml-28 md:ml-5 mb-8 lg:mb-0 bg-white  shadow-md rounded-md">
                <div classnName=" lg:ml-12">
                    {/* <!-- job single --> */}
                    <div classnNameName="single-job-items mb-50">
                        <div className="job-items flex flex-row mt-6">
                            <div className="company-img company-img-details sm:ml-4">
                                {
                                    console.log(skills)
                                }
                                <img className='image-logo ml-2' src={profileImage} alt="ProfileImage" /> 
                                    {/* image */}
                            </div>
                            <div className="job-tittle ml-6  ">
                                <a href="#">
                                    <h4 className='text-2xl hover:text-blue'>{""}</h4>
                                </a>
                                <h3 className='font-light'>{name }</h3>
                                <h3 className='font-light'>{email}</h3>
                                <h3 className='font-light'>{mobileNumber}</h3>

                               
                            </div>
                        </div>
                    </div>
                      {/* <!-- job single End --> */}
                    <div className="mt-5 ml-6 mr-6 ">
                        {/* <!-- Small Section Tittle --> */}
                        <div className="text-black text-lg font-semibold">
                            <h5>Experience</h5>
                        </div>
                        <p className='mt-3'>{experience}</p>
                    </div>
                    <div className="mt-6  ml-6 mr-6 ">
                            {/* <!-- Small Section Tittle --> */}
                        <div className="text-black text-lg font-semibold">
                            <h4>Education</h4>
                        </div>
                        <p>{education}</p>
                        <ul className=' mt-3'>
                            <li>System Software Development</li>
                            <li>Mobile Applicationin iOS/Android/Tizen or other platform</li>   
                        </ul>
                    </div>
                  
                </div>
            </div>

 
            <div className="w-full lg:w-1/2  md:ml-5 mb-8 lg:mb-0 bg-white shadow-md rounded-md"> 
                <div className="lg:ml-4">
                     <div className="mt-5 ml-6 mr-6 ">
                        {/* <!-- Small Section Tittle --> */}
                        <div className="text-black text-lg font-semibold">
                            <h5>Achievments</h5>
                        </div>
                        <p className='mt-3'>{achievement}</p>
                    </div>
                    <div className="mt-6  ml-6 mr-6 ">
                            {/* <!-- Small Section Tittle --> */}
                        <div className="text-black text-lg font-semibold">
                            <h4>Projects</h4>
                        </div>
                        <p className='mt-3'>{project}</p>
                        <ul className=' mt-3'>
                            <li>System Software Development</li>
                            <li>Mobile Applicationin iOS/Android/Tizen or other platform</li>   
                        </ul>
                    </div>
                    <div className="mt-6  ml-6 mr-6 ">
                            {/* <!-- Small Section Tittle --> */}
                        <div className="text-black text-lg font-semibold">
                            <h4>Skill</h4>
                        </div>
                        <ul className=' mt-3'>
                           {
                                (skills === undefined) || (skills === null )? '' : (
                                    skills.map((skill) => <li key={skill.value}>- {skill.value}</li>)
                                )
                               
                           }
                        </ul>
                    </div>
                
                
                </div>

            </div>
           
        </div>
    </div>
</section>

  );
}

export default JobseekerInfo;
