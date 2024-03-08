import React from 'react'

function VerifyMessage() {
  return (
   <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-slate-500 bg-opacity-70 backdrop-filter backdrop-blur-sm z-50 '>
        {/* <div className='flex justify-center items-center w-1/3 h-44 bg-slate-500 p-4'> */}
          <div class="max-w-2xl mx-auto mt-16 mb-6 p-4 text-center bg-zinc-200 text-indigo-800 rounded-sm">
               <h3 className='text-xl font-medium flex justify-center' style={{letterSpacing:".1rem"}}>Check Your Email</h3>
                <p className='mt-4 px-4' style={{letterSpacing:".1rem"}}>
                      We've sent a verification link to your email address. Please check your email and click the verification link to complete the login process.
                </p>
                <p className='mt-4 px-4' style={{letterSpacing:".1rem"}}>
                If you haven't received the email, please try again.
                </p>
                  
          {/* </div> */}
            
        </div>

   </div>
  )
}

export default VerifyMessage