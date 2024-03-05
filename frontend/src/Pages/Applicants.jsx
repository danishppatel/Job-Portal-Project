import React from 'react'

function Applicants({result}) {
    return (
        <>
          <div>
            <h3 className='text-lg font-bold mb-2'>{result.length} Applicants found</h3>
          </div>  
          <section>{result}</section>  
        </>
    );
}

export default Applicants;