import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import App from "../App";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import Contact from "../Pages/Contact";
import JobDetails from "../Pages/JobDetails";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import ResumeUploader from "../Pages/ResumeUploader";
import Mode from "../Pages/Mode";
import Error from "../Pages/Error";
import JobSeekerForm from "../Pages/JobSeekerForm";
import JobseekerInfo from "../Pages/JobseekerInfo";
import AppliedJob from "../Pages/AppliedJob";
import ModifyJobseekerForm from "../Pages/ModifyJobseekerForm";
import HomeEmployer from "../Pages/HomeEmployer";
import VerifyMessage from "../Pages/VerifyMessage";

const Router = () => {
  const user = useSelector(state => state.todos);
  const mode = user.mode

  const isAuthenticated = () => {
    if (user.userEmail === '') {
      return false;
    }
    return true;
  };

  useEffect(() => {
   
  }, [mode]);

  const PrivateRoute = ({ element, path }) => {
    return isAuthenticated(mode) ? (
      element
    ) : (
      <Navigate to="/login" state={{ from: path }} replace />
    );
  };

  const JobSeekerRoutes = () => (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<PrivateRoute element={<Home />} path="/" />} />
        <Route path="/applied-job" element={<PrivateRoute element={<AppliedJob />} path="/applied-job" />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="/job/:id" element={<PrivateRoute element={<JobDetails />} path="/job/:id" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/send-mail" element={<PrivateRoute element={<VerifyMessage />} path="/send-mail" />} />
        <Route path="/resumeUploader" element={<PrivateRoute element={<ResumeUploader />} path="/resumeUploader" />} />
        <Route path="/mode/:email" element={<PrivateRoute element={<Mode />} path="/mode/:email" />} />
        <Route path="/jobseeker" element={<PrivateRoute element={<JobSeekerForm />} path="/jobseeker" />} />
        <Route path="/modify-Jobseekerdata/:id" element={<PrivateRoute element={<ModifyJobseekerForm />} path="/modify-Jobseekerdata/:id" />} />
        <Route path="*" element={<Error />} />
    </Routes>
  );

  const EmployerRoutes = () => (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/home-employer" element={<PrivateRoute element={<HomeEmployer />} path="/home-employer" />} />
        <Route path="/post-job" element={<PrivateRoute element={<CreateJob />} path="/post-job" />} />
        <Route path="/my-job" element={<PrivateRoute element={<MyJobs />} path="/my-job" />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/send-mail" element={<PrivateRoute element={<VerifyMessage />} path="/send-mail" />} />
        <Route path="/mode/:email" element={<PrivateRoute element={<Mode />} path="/mode/:email" />} />
        <Route path="/jobseeker-info/:id" element={<PrivateRoute element={<JobseekerInfo />} path="/jobseeker-info/:id" />} />
        <Route path="/edit-jobs/:id" element={<PrivateRoute element={<CreateJob />} path="/edit-jobs/:id" />} />
        <Route path="*" element={<Error />} />
    </Routes>
  );

  return (
    mode === "jobseeker" ? <JobSeekerRoutes /> :
    (mode === "employer" ? <EmployerRoutes /> : <Routes> <Route path="*" element={<Login/>}/></Routes>)
  );
};

export default Router;


// import { createBrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
// import App from "../App";
// import Home from "../Pages/Home";
// import CreateJob from "../Pages/CreateJob";
// import MyJobs from "../Pages/MyJobs";
// import Contact from "../Pages/Contact";
// import JobDetails from "../Pages/JobDetails";
// import Login from "../Pages/Login";
// import SignUp from "../Pages/SignUp";
// import UpdateJob from "../Pages/UpdateJob";
// import ResumeUploader from "../Pages/ResumeUploader";
// import Mode from "../Pages/Mode";
// import Error from "../Pages/Error";
// import JobSeekerForm from "../Pages/JobSeekerForm";
// import JobseekerInfo from "../Pages/JobseekerInfo";
// import AppliedJob from "../Pages/AppliedJob";
// import ModifyJobseekerForm from "../Pages/ModifyJobseekerForm";
// import HomeEmployer from "../Pages/HomeEmployer";
// import VerifyMessage from "../Pages/VerifyMessage";
// import { useSelector } from "react-redux";

// // Replace this with your actual authentication logic
// let mode = localStorage.getItem("userrole");

// console.log("first mode :  ", mode)
// let user;
// const isAuthenticated = () => {
//   user = useSelector(state => state.todos)

//   if (user.userEmail === '') {
//     return false;
//   }

//   return true;

// };

// function PrivateRoute({ element, path, mode }) {

//   return isAuthenticated(mode) ? (
//     element
//   ) : (
//     <Navigate to="/login" state={{ from: path }} replace />
//   );
// }


// const getJobSeekerRoutes = () => {
//   return (
//     [
//       {
//         path: "/",
//         element: <App />,
//         children: [
//           {
//             path: "/",
//             element: <PrivateRoute element={<Home />} path="/" />,
//           },
//           {
//             path: "/applied-job",
//             element: <PrivateRoute element={<AppliedJob />} path="/applied-job" />
//           },
//           {
//             path: "/contact",
//             element: <Contact />
//           },
//           {
//             path: "/job/:id",
//             element: <PrivateRoute element={<JobDetails />} path="/job/:id" />
//           },
//         ]
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },
//       {
//         path: "/sign-up",
//         element: <SignUp />
//       },
//       {
//         path: "send-mail",
//         element: <PrivateRoute element={<VerifyMessage />} path="send-mail" />
//       },
//       {
//         path: "/resumeUploader",
//         element: <PrivateRoute element={<ResumeUploader />} path="resumeUploader" />
//       },
//       {
//         path: "/mode/:email",
//         element: <PrivateRoute element={<Mode />} path="/mode/:email" />
//       },
//       {
//         path: "/jobseeker",
//         element: <PrivateRoute element={<JobSeekerForm />} path="/jobseeker" />
//       },
//       {
//         path: "/modify-Jobseekerdata/:id",
//         element: <PrivateRoute element={<ModifyJobseekerForm />} path="/modify-Jobseekerdata/:id" />
//       },
//       {
//         path: "*",
//         element: <Error />
//       },
//     ]
//   )

// }

// const getEmployerRoutes = () => {
//   return (
//     [
//       {
//         path: "/",
//         element: <App />,
//         children: [

//           {
//             path: "/home-employer",
//             element: <PrivateRoute element={<HomeEmployer />} path="/home-employer" />
//           },
//           {
//             path: "/post-job",
//             element: <PrivateRoute element={<CreateJob />} path="/post-job" />
//           },
//           {
//             path: "/my-job",
//             element: <PrivateRoute element={<MyJobs />} path="/my-job" />
//           },
//           {
//             path: "/contact",
//             element: <Contact />
//           },
//         ]
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },
//       {
//         path: "/sign-up",
//         element: <SignUp />
//       },
//       {
//         path: "send-mail",
//         element: <PrivateRoute element={<VerifyMessage />} path="send-mail" />
//       },
//       {
//         path: "/mode/:email",
//         element: <PrivateRoute element={<Mode />} path="/mode/:email" />
//       },
//       {
//         path: "/jobseeker-info/:id",
//         element: <PrivateRoute element={<JobseekerInfo />} path="/jobseeker-info/:id" />
//       },
//       {
//         path: "/edit-jobs/:id",
//         element: <PrivateRoute element={<CreateJob />} path="/edit-jobs/:id" />
//       },
//       {
//         path: "*",
//         element: <Error />
//       }
//     ]
//   )

// }
// const router = createBrowserRouter(mode === "jobseeker"
//   ? getJobSeekerRoutes()
//   : (mode === "employer" ? getEmployerRoutes() : [
//     {
//       path: "*",
//       element: <Login />
//     },
//   ]
//   ));

// export default router;









