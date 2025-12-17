import {Component} from 'react'
import {Link} from 'react-router-dom'
import {IoLocationSharp} from 'react-icons/io5'
import {MdWork} from 'react-icons/md'
import {FcRating} from 'react-icons/fc'

import './index.css'

class JobCard extends Component {
  render() {
    const {jobDetails} = this.props
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      id,
    } = jobDetails
    return (
      <li className="jobCardContainer">
        <Link to={`jobs/${id}`}>
          <div className="companyLogoContainer">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="companyLogo"
            />
            <div className="companyNameAndRating">
              <h1 className="title">{title}</h1>
              <div className="rating">
                <FcRating size={20} className="ratingIcon" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="locationAndSalary">
            <div className="locationAndType">
              <div className="location">
                <IoLocationSharp size={23} className="icons" />
                <p>{location}</p>
              </div>
              <div className="employmentType">
                <MdWork size={23} className="icons" />
                <p>{employmentType}</p>
              </div>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
          <hr />
          <h1 className="descriptionHeading">Description</h1>
          <p className="description">{jobDescription}</p>
        </Link>
      </li>
    )
  }
}

export default JobCard
