import {Component} from 'react'
import {IoLocationSharp} from 'react-icons/io5'
import {MdWork} from 'react-icons/md'
import {FcRating} from 'react-icons/fc'

import './index.css'

class SimilarJobs extends Component {
  render() {
    const {eachSimilarJob} = this.props
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      jobDescription,
    } = eachSimilarJob
    return (
      <li className="similarJobsList">
        <div className="similarJobCompanyLogoContainer">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="companyLogo"
          />
          <div className="companyNameAndRating">
            <h1 className="title">{title}</h1>
            <div className="rating">
              <FcRating size={20} />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="locationAndType">
          <div className="location">
            <IoLocationSharp size={23} />
            <p>{location}</p>
          </div>
          <div className="employmentType">
            <MdWork size={23} />
            <p>{employmentType}</p>
          </div>
        </div>
        <h1 className="descriptionHeading">Description</h1>
        <p className="descriptionSimilarJob">{jobDescription}</p>
      </li>
    )
  }
}

export default SimilarJobs
