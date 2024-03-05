// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function ResumeUploader() {
  
//   const [driveLink, setDriveLink] = useState("");
//   const [pdfFile, setPdfFile] = useState(null);

//   const navigate = useNavigate();

//   const handleResume = () => {
//     if (driveLink.trim() !== '') {
//       // If not empty,then navigate to '/'
//       navigate('/');
//     } else {
//       toast.error('Please provide a Google Drive link.');
//     }
//   };

//   //pdf upload api
//   const handleFileChange = (event) => {
//     console.log("i am in handle");
//     setPdfFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!pdfFile) {
//       toast.error('Please select a PDF file');
//       return;
//     }
//     console.log("i am in handleupload");
//     const formData = new FormData();
//     formData.append('pdfFile', pdfFile);

//     try {
//       const response = await fetch('http://localhost:3000/data', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         console.log('PDF file uploaded successfully.');
//       } else {
//         console.error('Failed to upload PDF file.');
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   };

//   return (
//     // <div className='flex bg-[#FAFAFA] justify-center items-center h-screen'>
//     //   <form>
//     //     <h1 className='text-3xl text-pretty mb-4'>Upload Your Resume Here</h1>
//     //     <div>
//     //       <input
//     //         type='text'
//     //         placeholder='Upload Google Drive Link.....'
//     //         className='lg:w-80 sm:w-full border bg-white border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5'
//     //         value={driveLink}
//     //         onChange={(e) => setDriveLink(e.target.value)}
//     //       />
//     //       <button
//     //         type='button' // Add type="button" to prevent form submission
//     //         className='rounded-r-lg px-3 py-1.5 bg-blue text-white shrink-0'
//     //         onClick={handleResume} // Fix the typo here
//     //       >
//     //         Add
//     //       </button>
//     //     </div>
//     //     <div className='mt-4'>
//     //     <input type="file" accept=".pdf" onChange={handleFileChange} />
//     //      <button type='button'  onClick={handleUpload}>Upload PDF</button>

//     //     </div>
//     //   </form>
//     //   <ToastContainer/>
//     // </div>

//     <div className='flex bg-[#FAFAFA] justify-center items-center h-screen'>
//     <form>
//       <h1 className='text-3xl text-pretty mb-4'>Upload Your Resume Here</h1>
//       <div>
//         <input
//           type='text'
//           placeholder='Upload Google Drive Link.....'
//           required
//           className='lg:w-80 sm:w-full border bg-white border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5'
//           value={driveLink}
//           onChange={(e) => setDriveLink(e.target.value)
//           }
//         />
//          <input type="file" accept=".pdf" onChange={handleFileChange} />
//         <button
//           type='submit'
//           className='rounded-r-lg px-3 py-1.5 bg-blue text-white shrink-0'
//           onSubmit={handleUpload}
//         >
//           Add / Upload PDF
//         </button>
//       </div>
//       {/* Removed the second button */}
//     </form>
//     <ToastContainer />
//   </div>
//   );
// }

// export default ResumeUploader;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Components/Loading';

function ResumeUploader() {
  const [driveLink, setDriveLink] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [bothFieldsFilled, setBothFieldsFilled] = useState(false);
  const[c,setC] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleResume = () => {
    if (driveLink.trim() !== '') {
      // If not empty, then navigate to '/'
      navigate('/');
      setBothFieldsFilled(true);
    } else {
      toast.error('Please provide a Google Drive link.');
      setBothFieldsFilled(false);
    }
  };

  // pdf upload api
  const handleFileChange = (event) => {
    setBothFieldsFilled(true);
    console.log("i am in handle");
    setPdfFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (bothFieldsFilled && c) {
      const formData = new FormData();
      formData.append('pdfFile', pdfFile);

      try {
        const response = await fetch('http://localhost:3000/data', {
          method: 'POST',
          body: formData,
        });
        
        setLoading(true);

        //console.log(loading)
        if (response.ok) {
          // console.log('PDF file uploaded successfully.');
         
        //  console.log("i am here ");
          setTimeout(()=>{
            setLoading(false);
            navigate('/jobseeker');
          }, 140000)

        } else {
          console.error('Failed to upload PDF file.');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    } else {
      toast.error('Please provide both a Google Drive link and select a PDF file.');
    }
  };

  return (
    <div className='flex bg-[#FAFAFA] justify-center items-center h-screen'>
      <form>
        <h1 className='text-3xl text-pretty mb-4'>Upload Your Resume Here</h1>
        <div>
          <input
            type='text'
            placeholder='Upload Google Drive Link.....'
            required
            className='lg:w-80 sm:w-full border bg-white border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5'
            value={driveLink}
            onChange={(e) => {
              setC(true);
             setDriveLink(e.target.value)}
            }
          />
          <input type="file" className=' border bg-white border-black/10 py-1' accept=".pdf" onChange={handleFileChange} />
          <button
              type='button'
              className='rounded-r-lg px-3 py-1.5 bg-blue text-white shrink-0'
              onClick={handleUpload}
            >
              Add / Upload PDF
            </button>
           { loading && <Loading/>}
          
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ResumeUploader;

