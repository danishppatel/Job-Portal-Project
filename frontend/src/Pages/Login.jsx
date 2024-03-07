import React ,{useState} from "react";
import {Link, NavLink, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa6";
import { LuLogIn } from "react-icons/lu";
import { GoogleAuthProvider ,getAuth, signInWithPopup} from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import app from "../firebase/firebase.config";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addTodo } from "../todoSlicer";

axios.defaults.withCredentials = true; 


function Login() {
  const dispatch = useDispatch();
//--->  google authentication
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate()

  const handleLogin= ()=>{
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;

      //  console.log(user.email,"user1-------user1");
      // localStorage.setItem('usertoken' ,res.token);

       navigate(`/mode/${user.email}`);
    
    }).catch((error) => {
      
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }

  //---> signin
  const [inputValue , setInputValue] = useState({
    email:"",
    password:"",
    mode:"jobseeker"
  });
  
  // console.log(inputValue);
  
  const setValue = (e) =>{
    // console.log(e.target.value)
    const {name ,value} = e.target;
    
    setInputValue(() =>{
      return {
        ...inputValue,
        [name] :value
      }
    })
  }

  console.log("input value" , inputValue)

  const loginUser = async (e)=>{
    e.preventDefault();

    const {email ,password} = inputValue;

    if(email === ""){
      toast.error('Please enter your Email');
    }
    else if(!email.includes('@')){
      toast.error('Please enter valid Email');
    }
    else if(password === ""){
      toast.error('Please enter your Password');
    }
    else if(password.length <6){
      toast.error('Password must be at least 6 characters');
    }
    else{

       try {
        // const data =  await axios('http://localhost:3000/login', inputValue).post()
        
        const data = await fetch("http://localhost:3000/login",  {
          method: 'POST',
          mode:"cors",
          headers :{
            "Content-Type" : 'application/json',
          },
          body : JSON.stringify(inputValue)
        })
      
        const res = await data.json();

        const resAcknowledge =  await res.acknowledged;
        if(resAcknowledge==="success"){
          toast.success(res.message);
         
          let userEmail = email;
          //set token in local storage
          localStorage.setItem('usertoken' ,res.token);

          setInputValue({
            ...inputValue,
            email:"",
            password:"",
            mode:"jobseeker"
           })
           
          dispatch(addTodo({userEmail:email}))  //dispatch

          setTimeout(() => {
          
            if(inputValue.mode === "jobseeker"){
              localStorage.setItem("selectedMode", "jobseeker")
              navigate(`/resumeUploader`)
            }
            else if(inputValue.mode === "employer"){
              localStorage.setItem("selectedMode", "employer")
              navigate(`/`)
            }
          }, 1500);

        } 
        else if(res.error){
          toast.error(res.error);
        }
       } catch (error) {
          toast.error("Please Register...");
       }
       
    }
  }

  
  return (
    <section className="relative z-10 overflow-hidden bg-[#FAFAFA] py-10 dark:bg-dark lg:py-[50px]  ">
      <div className="container">
        <div className="flex flex-col sm:flex-row lg:ml-28 md:ml-10">
          <div className="w-full lg:w-2/3  md:ml-5 mb-8 lg:mb-0 bg-white">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              class="img-fluid"
              alt="Phone image"
            />
          </div>

          <div className="w-full lg:w-1/3 md:ml-5 mb-8 lg:mb-0 bg-white">
            <div>
              <h1 className="flex flex-row items-center justify-center text-3xl font-semibold mt-8 mb-6 sm:mb-2">
                <LuLogIn />
                <span className="lg:ml-1"> Sign into your account</span>
              </h1>
            </div>

            {/* onsubmit */}
            <form action="">
              {/*for email  */}
              <div className="flex flex-col ml-4 mt-6 mr-4">
                <label className=" text-start text-lg mb-2">Email address</label>
                <LoginInputBox
                   type="email"
                   value={inputValue.email}
                   onChange={setValue}
                   name="email"
                   id="email"
                   placeholder="Enter Your Email"
                />
              </div>

              {/*for password  */}
              <div className="flex flex-col ml-4 mr-4">
                <label className=" text-start text-lg mb-2 mt-2">Password</label>
                <LoginInputBox
                   type="password"
                   value={inputValue.password}
                   onChange={setValue}
                   name="password"
                   id="password"
                   placeholder="Enter Your Password"
                />
              </div>

              <div className="flex flex-col ml-4 mr-4">
                <h4 className=" text-start text-lg mb-2 mt-2">Select the mode that you want?</h4>
                <div className='w-full'>
                  <select
                    className='border sm:w-full rounded py-2 px-4  mb-6'
                    value={inputValue.mode}
                    onChange={setValue}
                    name='mode'
                    id='mode'
                  >
                    <option value='jobseeker'> JobSeeker</option>
                    <option value='employer'> Employer</option>
                  </select>
                </div>

                
              </div>

             

              <div className="mx-4">
                <button
                    type="submit"
                    className="w-full rounded border border-white bg-blue p-3 text-white transition hover:bg-opacity-90"
                    onClick={loginUser}
                >
                   Sign In
                </button>
              </div>
            </form>

            <div
              className="divider d-flex align-items-center my-4"
              style={{ flex: 1, height: "1px", background: "#eee" }}
            >
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>

            <div className="mx-4 my-8">
              <button
                    type="submit"
                    className="w-full flex flex-row items-center justify-center rounded border border-white bg-[#4085e5] p-3 text-white transition hover:bg-opacity-90"
                    onClick={handleLogin}>
                    <FaGoogle /> <span className="ml-2">Continue with google</span>
                
              </button>
            
            </div>

            <div className="flex justify-between md:justify-between  sm:justify-normal mx-4 my-8">
              <p>
                Don't have an account?{" "}
                <NavLink to="/sign-up" className="text-blue underline">
                  Register here
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </section>
  );
}

export default Login;



const LoginInputBox = ({ type, placeholder, name, id, value, onChange }) => {
  return (
    <>
      <div className="mb-6">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          className="w-full rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
        />
      </div>
    </>
  );
};
