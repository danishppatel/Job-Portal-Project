import React, { useState } from 'react'
import {FiMapPin, FiSearch} from 'react-icons/fi'
import {Typewriter} from 'react-simple-typewriter'

function Banner({query, handleInputChange}) {

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14'>
        <h1 className='text-5xl font-serif font-bold text-primary mb-5 '>Your <span className='text-blue'>Dream</span> Job <br></br>Is Waiting For You </h1>
        <p className='text-1xl mb-3'>Thousands of Jobs in the
                  <Typewriter
                    words = {[' computer, engineering and technology sectors are waiting for you']}
                    loop ={true}
                    cursor
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                   />
        </p>
        
        {/* form */}
        <form>
            <div className='flex justify-start md:flex-row flex-col md:gap-0 gap-5'>
                {/* Job title , based on filtering it  */}
                <div className='flex md:rounded-s-md rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full'>
                    <input type="text" name="title" id="title" placeholder='What position you are looking for?' className='block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6' 
                    onChange={handleInputChange}
                    value={query}/>
                    <FiSearch className='absolute mt-2.5 ml-2 text-gray-400'/>
                </div>
                <div className='flex md:rounded-none rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 w-full'>
                    <input type="text" name="location" id="locaton" placeholder='Location' className='block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6' 
                    />
                    <FiMapPin className='absolute mt-2.5 ml-2 text-gray-400'/>
                </div>

                <button type='submit' className='bg-blue py-2 px-8 text-white md:rounded-s-none rounded'>Search</button>
            </div>
        </form>
    </div>
    
  )
}

export default Banner