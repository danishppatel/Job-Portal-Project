import React from 'react'
import { Link } from 'react-router-dom'

function CardUsers({data}) {
    // const navigate = useNavigate();
    const {_id, profileImage, name, email, jobPost, employmentType, createAt} = data;
    let date = createAt.slice(0, 10);
    let parts = date.split('-');
    date = parts[2] + '-' + parts[1] + '-' + parts[0];

  return (
    <div className="single-job-items mb-30 mb-5 border">
      <div className="job-items">
        <div className="company-img">
           <img className='image-logo' src={profileImage} alt="profileImage" />
        </div>
        <div className="job-tittle job-tittle2">
          <div className='flex sm:flex-row flex-col sm:justify-evenly sm:items-center'>
            <h4 className='text-2xl lg: mr-32'>{name}</h4>
            <h4 className='text-xl'>{email}</h4>
          </div>
          <h2>{jobPost}</h2>
          <h2 className='flex items-end'> {date}</h2>
          
        </div>
      </div>
      <div className="items-link items-link2 f-right">
          <Link to={`/jobseeker-info/${_id}`}>
          <button  type='button'>See Details</button>
          </Link>
      </div>
    </div>

  )
}

export default CardUsers