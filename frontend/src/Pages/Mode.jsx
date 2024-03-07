import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Mode = () => {
  const email = useParams();

  const [selectedMode, setSelectedMode] = useState("");

  console.log("selected mode in mode :  ", selectedMode)

  const navigate = useNavigate();

  //console.log(selectedMode)
  
  useEffect(() => {
    if(selectedMode === "employer"){
        localStorage.setItem("selectedMode", selectedMode);
        navigate(`/`);
    }else if(selectedMode === "jobseeker"){
      localStorage.setItem("selectedMode", selectedMode);
      navigate(`/resumeUploader`)
    }
    // if()
  }, [selectedMode]);

  return (
    <section className="bg-white">
      <div className="container mx-sm:mx-4 p-4">
        <div className="flex flex-col sm:flex-row lg:justify-evenly items-center lg:flex-row lg:mt-24 lg:ml-44 ">
          <div
            className=" h-[400px] w-[400px] mb-10  lg:mb-0 mr-12"
            onClick={() => setSelectedMode("jobseeker")}
          >
            <ModeCard imageUrl="/images/jobseeker1.png" altText="Job Seeker" />
          </div>
          <div
            className=" h-[400px] w-[400px] mr-12 "
            onClick={() => setSelectedMode("employer")}
          >
            <ModeCard imageUrl="/images/employer.jpg" altText="Employer" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mode;

const ModeCard = ({ imageUrl, altText }) => {
  return (
    <div className="relative w-full m-6 shadow-2xl  transition-opacity hover:opacity-75 hover:cursor-pointer">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-full object-cover rounded-2xl"
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-start justify-center text-black">
        <span className="lg:text-3xl sm:text-2xl font-serif font-bold mt-0">
          {altText}
        </span>
      </div>
    </div>
  );
};
