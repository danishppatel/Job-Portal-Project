import {createBrowserRouter, Navigate,Route, Routes,useLocation} from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import Contact from "../Pages/Contact";
import JobDetails from "../Pages/JobDetails";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import UpdateJob from "../Pages/UpdateJob";
import ResumeUploader from "../Pages/ResumeUploader";
import Mode from "../Pages/Mode";
import Error from "../Pages/Error";
import JobSeekerForm from "../Pages/JobSeekerForm";
import JobseekerInfo from "../Pages/JobseekerInfo";
import AppliedJob from "../Pages/AppliedJob";
import ModifyJobseekerForm from "../Pages/ModifyJobseekerForm";
import HomeEmployer from "../Pages/HomeEmployer";
import VerifyMessage from "../Pages/VerifyMessage";
import { useSelector } from "react-redux";

// Replace this with your actual authentication logic
let mode = localStorage.getItem("userrole");

console.log("first mode :  ", mode)
let user;
const isAuthenticated = () => {
   user = useSelector(state=>state.todos)

   if(user.userEmail === ''){
    return false;
   }
 
   return true;

};

function PrivateRoute({ element, path,mode }) {
  
  return isAuthenticated(mode) ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: path }} replace />
  );
}


const getJobSeekerRoutes = () => {
  return (
    [
      {
        path: "/",
        element: <App/>,
        children:[
            { 
              path:"/", 
              element:<PrivateRoute element={<Home/>} path="/"/>,
            },
            {
              path:"/applied-job",
              element:<PrivateRoute element={<AppliedJob/>} path="/applied-job"/>
            },
            {
              path:"/contact",  
              element:<Contact/>
            },
            {
              path:"/job/:id",  
              element:<PrivateRoute element={<JobDetails/>} path="/job/:id"/>
            },      
          ]
      },
      {
          path:"/login",  
          element:<Login/>,      
      },
      {
          path:"/sign-up",  
          element:<SignUp/>
      },
      {
        path:"send-mail",
        element:<PrivateRoute element={<VerifyMessage/>} path="send-mail"/>
      },
      {
          path:"/resumeUploader",
          element:<PrivateRoute element={<ResumeUploader/>} path="resumeUploader"/>
      },
      {
          path:"/mode/:email",
          element:<PrivateRoute element={<Mode/>} path="/mode/:email"/>
      },
      {
        path:"/jobseeker",
        element:<PrivateRoute element={<JobSeekerForm/>} path="/jobseeker"/>
      },
      {
        path:"/modify-Jobseekerdata/:id",
        element:<PrivateRoute element={<ModifyJobseekerForm/>} path="/modify-Jobseekerdata/:id"/>
      },    
      {
        path:"*",
        element:<Error/>
      },
    ]
  )

}

const getEmployerRoutes = () => {
  return (
    [
      {
        path: "/",
        element: <App/>,
        children:[
            
            {
              path:"/home-employer",
              element:<PrivateRoute element={<HomeEmployer/>} path="/home-employer" />
            },
            { 
              path:"/post-job",  
              element:<PrivateRoute element={<CreateJob/>} path="/post-job"/>
            },
            {
              path:"/my-job",  
              element:<PrivateRoute element={<MyJobs/>} path="/my-job"/>
            },
            {
              path:"/contact",  
              element:<Contact/>
            },
          ]
      },
      {
          path:"/login",  
          element:<Login/>,      
      },
      {
          path:"/sign-up",  
          element:<SignUp/>
      },
      {
        path:"send-mail",
        element:<PrivateRoute element={<VerifyMessage/>} path="send-mail"/>
      },
      {
          path:"/mode/:email",
          element:<PrivateRoute element={<Mode/>} path="/mode/:email"/>
      },
      {
          path:"/jobseeker-info/:id",
          element:<PrivateRoute element={<JobseekerInfo/>} path="/jobseeker-info/:id"/>
      },
      {
        path:"/edit-jobs/:id",
        element:<PrivateRoute element={<CreateJob/>} path="/edit-jobs/:id"/>
      },
      {
        path:"*",
        element:<Error/>
      }    
    ]
  )

}

// const router= ()=>{
//   let f =false;
 
//   if(mode ===   'employer'){
//     // employer
//     return (
//       createBrowserRouter([
//         {
//           path: "/",
//           element: <App/>,
//           children:[
              
//               {
//                 path:"/home-employer",
//                 element:<PrivateRoute element={<HomeEmployer/>} path="/home-employer" />
//               },
//               { 
//                 path:"/post-job",  
//                 element:<PrivateRoute element={<CreateJob/>} path="/post-job"/>
//               },
//               {
//                 path:"/my-job",  
//                 element:<PrivateRoute element={<MyJobs/>} path="/my-job"/>
//               },
//               {
//                 path:"/contact",  
//                 element:<Contact/>
//               },
//             ]
//         },
//         {
//             path:"/login",  
//             element:<Login/>,      
//         },
//         {
//             path:"/sign-up",  
//             element:<SignUp/>
//         },
//         {
//           path:"send-mail",
//           element:<PrivateRoute element={<VerifyMessage/>} path="send-mail"/>
//         },
//         {
//             path:"/mode/:email",
//             element:<PrivateRoute element={<Mode/>} path="/mode/:email"/>
//         },
//         {
//             path:"/jobseeker-info/:id",
//             element:<PrivateRoute element={<JobseekerInfo/>} path="/jobseeker-info/:id"/>
//         },
//         {
//           path:"/edit-jobs/:id",
//           element:<PrivateRoute element={<CreateJob/>} path="/edit-jobs/:id"/>
//         },
//         {
//           path:"*",
//           element:<Error/>
//         }    
//       ])
//     )
//   }else if(mode === 'jobseeker'){
//     return (
//       createBrowserRouter([
//         {
//           path: "/",
//           element: <App/>,
//           children:[
//               { 
//                 path:"/", 
//                 element:<PrivateRoute element={<Home/>} path="/"/>,
//               },
//               {
//                 path:"/applied-job",
//                 element:<PrivateRoute element={<AppliedJob/>} path="/applied-job"/>
//               },
//               {
//                 path:"/contact",  
//                 element:<Contact/>
//               },
//               {
//                 path:"/job/:id",  
//                 element:<PrivateRoute element={<JobDetails/>} path="/job/:id"/>
//               },      
//             ]
//         },
//         {
//             path:"/login",  
//             element:<Login/>,      
//         },
//         {
//             path:"/sign-up",  
//             element:<SignUp/>
//         },
//         {
//           path:"send-mail",
//           element:<PrivateRoute element={<VerifyMessage/>} path="send-mail"/>
//         },
//         {
//             path:"/resumeUploader",
//             element:<PrivateRoute element={<ResumeUploader/>} path="resumeUploader"/>
//         },
//         {
//             path:"/mode/:email",
//             element:<PrivateRoute element={<Mode/>} path="/mode/:email"/>
//         },
//         {
//           path:"/jobseeker",
//           element:<PrivateRoute element={<JobSeekerForm/>} path="/jobseeker"/>
//         },
//         {
//           path:"/modify-Jobseekerdata/:id",
//           element:<PrivateRoute element={<ModifyJobseekerForm/>} path="/modify-Jobseekerdata/:id"/>
//         },    
//         {
//           path:"*",
//           element:<Error/>
//         },
//       ])
//     )
//   }
 
// }


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App/>,
//     children:[
//         { 
//           path:"/", 
//           element:<PrivateRoute element={<Home/>} path="/"/>,
//         },
//         {
//           path:"/home-employer",
//           element:<PrivateRoute element={<HomeEmployer/>} path="/home-employer" mode={"employer"}/>
//         },
//         { 
//           path:"/post-job",  
//           element:<PrivateRoute element={<CreateJob/>} path="/post-job" mode={"employer"}/>
//         },
//         {
//           path:"/my-job",  
//           element:<PrivateRoute element={<MyJobs/>} path="/my-job" mode={"employer"}/>
//         },
//         {
//           path:"/applied-job",
//           element:<PrivateRoute element={<AppliedJob/>} path="/applied-job"/>
//         },
//         {
//           path:"/contact",  
//           element:<Contact/>
//         },
//         {
//           path:"/job/:id",  
//           element:<PrivateRoute element={<JobDetails/>} path="/job/:id"/>
//         },
        
//       ]
//   },
//   {
//       path:"/login",  
//       element:<Login/>,      
//   },
//   {
//       path:"/sign-up",  
//       element:<SignUp/>
//   },
//   {
//     path:"send-mail",
//     element:<PrivateRoute element={<VerifyMessage/>} path="send-mail"/>
//   },
//   {
//       path:"/resumeUploader",
//       element:<PrivateRoute element={<ResumeUploader/>} path="resumeUploader"/>
//   },
//   {
//       path:"/mode/:email",
//       element:<PrivateRoute element={<Mode/>} path="/mode/:email"/>
//   },
//   {
//     path:"*",
//     element:<Error/>
//   },
//   {
//     path:"/jobseeker",
//     element:<PrivateRoute element={<JobSeekerForm/>} path="/jobseeker"/>
//   },
//   {
//     path:"/modify-Jobseekerdata/:id",
//     element:<PrivateRoute element={<ModifyJobseekerForm/>} path="/modify-Jobseekerdata/:id"/>
//   },
//   {
//       path:"/jobseeker-info/:id",
//       element:<PrivateRoute element={<JobseekerInfo/>} path="/jobseeker-info/:id"/>
//   },
//   {
//     path:"/edit-jobs/:id",
//     element:<PrivateRoute element={<CreateJob/>} path="/edit-jobs/:id"/>
// }
  
  
  
// ]);

const router = createBrowserRouter(mode === "jobseeker" 
                                              ? getJobSeekerRoutes() 
                                              :( mode==="employer" ? getEmployerRoutes() : [
                                                                                              {
                                                                                                path:"*",
                                                                                                element:<Login/>
                                                                                              },
                                                                                            ] 
 ));

export default router;
