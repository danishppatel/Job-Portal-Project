import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'

function UpdateJob() {
    const {id}= useParams();
    const {companyName , companyLogo, jobTitle, minPrice, maxPrice,employmentType , postingDate, jobLocation ,jobDescription,companyDescription, experienceLevel,
        salaryType,vacancy, postedBy, websiteLink} = useLoaderData();

  return (
    <div>UpdateJob</div>
  )
}

export default UpdateJob