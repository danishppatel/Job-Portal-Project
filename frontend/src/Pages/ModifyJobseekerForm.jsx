import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";

function ModifyJobseekerForm() {
    const navigate = useNavigate();

    const [defaultValue, setDefaultValue] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [jobPost, setJobPost] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [employmentType, setEmploymentType] = useState("");
    const [experience, setExperience] = useState("");
    const [education, setEducation] = useState("");
    const [achievement, setAchievement] = useState("");
    const [project, setProject] = useState("");
    const [SelectedOption, setSelectedOption] = useState(null);
        let {id}= useParams();
        let todos = useSelector(state =>state.todos)
    useEffect(() => {
    const fetchDataFromApi = async () => {
        try {
        const response = await fetch(`http://localhost:3000/jobSeeker/${todos.userEmail}`);
        const data = await response.json();
            
        console.log(data);
        setName(data[0].name);
        setEmail(data[0].email);
        setMobileNumber(data[0].mobileNumber);
        setJobPost(data[0].jobPost);
        setProfileImage(data[0].profileImage);
        setEmploymentType(data[0].employmentType);
        setExperience(data[0].experience);
        setEducation(data[0].education);
        setAchievement(data[0].achievement);
        setProject(data[0].project);
        } catch (error) {
        console.error("Error fetching data from API:", error);
        }
    };

    fetchDataFromApi();

    
    }, []);

    const hanedleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
        case "name":
        setName(value);
        break;
        case "email":
        setEmail(value);
        break;
        case "mobileNumber":
        setMobileNumber(value);
        break;
        case "jobPost":
        setJobPost(value);
        break;
        case "profileImage":
        setProfileImage(value);
        break;
        case "employmentType":
        setEmploymentType(value);
        break;
        case "experience":
        setExperience(value);
        break;
        case "education":
        setEducation(value);
        break;
        case "achievement":
        setAchievement(value);
        break;
        case "project":
        setProject(value);
        break;
        default:
        break;
    }
    };

    const onSubmit = async () => {
    const data = {
        name,
        email,
        mobileNumber,
        jobPost,
        skills: SelectedOption,
        profileImage,
        employmentType,
        experience,
        education,
        achievement,
        project,
    };

    // Log the modified data
    

    try {
        // Send the modified data to the server
        fetch(`http://localhost:3000/jobSeekerupdate/id/${id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        })
      
        navigate(`/`);
        
    } catch (error) {
        console.error("Error submitting form data:", error);
    }

    // Reset form or navigate to another page if needed
   
    setSelectedOption(null);
   
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
        <form className="space-y-5">
            {/* ... (Your existing JSX for input fields) */}
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
                        type="text"
                        placeholder="Ex:Patel Brij"
                        value={email}
                        name="email"
                        onChange={hanedleChange}
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
                        placeholder="Ex:Patel Brij"
                        value={mobileNumber}
                        name="mobileNumber"
                        onChange={hanedleChange}
                        className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-2 text-lg">Job Post</label>
                    <input
                    type="text"
                    placeholder="Ex:Patel Brij"
                    value={jobPost}
                    name="jobPost"
                    onChange={hanedleChange}
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
                        placeholder="Ex:Patel Brij"
                        value={profileImage}
                        name="profileImage"
                        onChange={hanedleChange}
                        className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-2 text-lg">Employment Type</label>
                    <select
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
                    
                    rows={6}
                    type="text"
                    placeholder="Ex:Patel Brij"
                    value={experience}
                    name="experience"
                    onChange={hanedleChange}
                    
                    
                ></textarea>
                </div>
                {/* 8 th row */}
                <div className="w-full">
                <label className="block mb-2 text-lg">Education</label>
                <textarea
                    className="w-full pl-3 py-1.5 focus:outline-none"
                    
                    rows={6}
                    type="text"
                    placeholder="Ex:Patel Brij"
                    value={education}
                    name="education"
                    onChange={hanedleChange}
                    
                ></textarea>
                </div>
                {/* 9 th row */}
                <div className="w-full">
                <label className="block mb-2 text-lg">Achievement</label>
                <textarea
                    className="w-full pl-3 py-1.5 focus:outline-none"
                    
                    rows={6}
                    type="text"
                    placeholder="Ex:Patel Brij"
                    value={achievement}
                    name="achievement"
                    onChange={hanedleChange}
                    
                    
                ></textarea>
                </div>
                {/* 10 th row */}
                <div className="w-full">
                <label className="block mb-2 text-lg">Projects</label>
                <textarea
                    className="w-full pl-3 py-1.5 focus:outline-none"
                    
                    rows={6}
                    type="text"
                    placeholder="Ex:Patel Brij"
                    value={project}
                    name="project"
                    onChange={hanedleChange}
                ></textarea>
                </div>

            
        </form>
        <button    className="block mt-12 bg-blue text-white font-semibold  mx-4 px-8 py-2 rounded-sm cursor-pointer" onClick={onSubmit}>Submit</button>
        
        </div>
    </div>
    );
}

export default ModifyJobseekerForm