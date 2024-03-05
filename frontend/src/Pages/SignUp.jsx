import React, { useState  } from "react";
import {Link, NavLink, useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {

  const navigate = useNavigate();

  const [inputValue , setInputValue] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword :"",
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

  const addUserData = async (e)=>{
    e.preventDefault();

    const {name , email ,password , confirmPassword} = inputValue;

    if(name === ""){
      toast.error('Please enter your name');
    }
    else if(email === ""){
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
    else if(confirmPassword === ""){
      toast.error('Please enter your Confirm Password');
    }
    else if(confirmPassword.length <6){
      toast.error('Confirm Password must be at least 6 characters');
    }
    else if(password !== confirmPassword){
      toast.error('Password and Confirm Password do not match');
    }else{
        //call api
        const data =  await fetch("http://localhost:3000/sign-up",  {
          method: 'POST',
          mode:"cors",
          headers :{
            "Content-Type" : 'application/json',
          },
          body : JSON.stringify(inputValue)
        })
        
        const res = await data.json();

        const responseStatus =  await res.status;

        if(responseStatus === "success" ){
          // Successfully done
           toast.success(res.message);
           
           setInputValue({
            ...inputValue,
            name:"",
            email:"",
            password:"",
            confirmPassword:""

           })
           setTimeout(() => {
            navigate(`/mode/${inputValue.email}`);
          }, 3000);
        }
        else if(res.error){
          toast.error(res.error);
        }

        console.log(res)
    }
  }

  return (
    <section className="relative z-10 overflow-hidden bg-[#FAFAFA] py-10 dark:bg-dark lg:py-[50px]  ">
      <div className="container">
        <div className="flex flex-col sm:flex-row lg:ml-28 md:ml-10">
          <div className="w-full lg:w-5/12  md:ml-5 mb-8 lg:mb-0 bg-white">
            <div>
              <h1 className="flex flex-row items-center justify-center text-3xl font-semibold mt-8 mb-6 sm:mb-2">
                
                <span className="lg:ml-1"> Create an Account</span>
              </h1>
            </div>

            <div className="relative rounded-lg bg-white p-6 sm:p-8 shadow-lg dark:bg-dark-2 border-spacing-1">
              <form>
                <SignupInputBox
                  onChange={setValue}
                  type="text"
                  name="name"
                  id="name"
                  value={inputValue.name}
                  placeholder="Your Name"
                />
                <SignupInputBox
                  onChange={setValue}
                  type="email"
                  name="email"
                  id="email"
                  value={inputValue.email}
                  placeholder="Your Email"
                />
                <SignupInputBox
                  onChange={setValue}
                  type="password"
                  name="password"
                  id="password"
                  value={inputValue.password}
                  placeholder="Your Password"
                />
                <SignupInputBox
                  onChange={setValue}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={inputValue.confirmPassword}
                  placeholder="Your Confirm Password"
                />

                <div className="flex justify-start md:justify-start  sm:justify-normal  mt-2 mb-4 sm:mx-2 ">
                  <div>
                    <input
                      type="checkbox"
                      id="checkboxField"
                      value=""
                      checked
                    />
                    <label className="form-checkbox ml-2 h-6 w-6 "  >
                      I agree all statements in{" "}
                      <a href="#!">Terms of service</a>
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full rounded border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
                    onClick={addUserData}
                  >
                    Register
                  </button>
                </div>

                <div className="mt-6 sm:mt-3">
                  <label className="ml-12 h-6 w-6 ">
                    Have already an account? 
                      <NavLink to='/login' className="text-blue">Login here</NavLink>
                  </label>
                </div>

                
              </form>
            </div>
          </div>

          <div className="w-full lg:w-7/12 md:ml-5  lg:mb-0 bg-white  hidden md:block">
        
            <img
              src="https://img.freepik.com/premium-vector/online-registration-sign-up-with-man-sitting-near-smartphone_268404-95.jpg"
              className="w-full h-full object-contain"
              alt="Phone image"
            />
          
          </div>
        </div>
      </div>
      <ToastContainer/>
      
    </section>
  );
}

export default SignUp;

const SignupInputBox = ({type, placeholder, name,id, onChange ,value}) => {
  return (
    <>
      <div className="mb-6">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          id={id}
          onChange={onChange}
          value={value}
          className="w-full rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
        />
      </div>
    </>
  );
};
