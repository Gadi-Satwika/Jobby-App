import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoLocationSharp} from 'react-icons/io5'
import {MdWork} from 'react-icons/md'
import {FcRating} from 'react-icons/fc'
import Loader from 'react-loader-spinner'
import {FaExternalLinkAlt} from 'react-icons/fa'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const modes = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN-PROGRESS',
  initial: 'INITIAL',
}

class JobItemDetailsRoute extends Component {
  state = {jobDetailsList: [], pageStatus: modes.initial}

  componentDidMount = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      pageStatus: modes.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const api = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedDataJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        id: data.job_details.id,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        skills: data.job_details.skills.map(eachSkills => ({
          name: eachSkills.name,
          imageUrl: eachSkills.image_url,
        })),
      }
      const similarJobsUpdated = {
        similarJobs: data.similar_jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          jobDescription: eachJob.job_description,
          id: eachJob.id,
          employmentType: eachJob.employment_type,
          title: eachJob.title,
          rating: eachJob.rating,
          location: eachJob.location,
        })),
      }
      const updatedData = {
        jobDetails: updatedDataJobDetails,
        similarJobs: similarJobsUpdated.similarJobs,
      }
      this.setState({
        jobDetailsList: updatedData,
        pageStatus: modes.success,
      })
    } else {
      this.setState({
        pageStatus: modes.failure,
      })
    }
  }

  renderLoaderView = () => (
    <div className="loader-container-jobs" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobDetailsList} = this.state
    const {
      companyLogoUrl,
      title,
      jobDescription,
      location,
      packagePerAnnum,
      employmentType,
      rating,
      companyWebsiteUrl,
      skills,
      lifeAtCompany,
    } = jobDetailsList.jobDetails
    const {similarJobs} = jobDetailsList
    return (
      <div className="totalPagejobItem">
        <div className="jobItemJobCardContainer">
          <div className="jobItemCompanyLogoContainer">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
                <IoLocationSharp size={23} />
                <p>{location}</p>
              </div>
              <div className="employmentType">
                <MdWork size={23} />
                <p>{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="descriptionAndLink">
            <h1 className="descriptionHeading">Description</h1>
            <div className="link">
              <a href={companyWebsiteUrl} target="blank">
                Visit
              </a>
              <FaExternalLinkAlt size={20} />
            </div>
          </div>
          <p className="description">{jobDescription}</p>
          <h1 className="descriptionHeading">Skills</h1>
          <ul className="skillsContainer">
            {skills.map(eachSkills => (
              <li key={eachSkills.name}>
                <img
                  src={eachSkills.imageUrl}
                  alt={eachSkills.name}
                  className="skillIcon"
                />
              </li>
            ))}
          </ul>
          <h1 className="lifeAtCompanyHeading">Life at Company</h1>
          <div className="lifeAtCompanyContainer">
            <p className="lifeAtCompanyDescription">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="lifeAtCompanyImage"
            />
          </div>
        </div>
        <div className="similarJobs">
          <h1 className="similarJobsHeading">Similar Jobs</h1>
          <ul className="similarJobListContainer">
            {similarJobs.map(eachJob => (
              <SimilarJobs eachSimilarJob={eachJob} key={eachJob.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failureViewJobItemDetails">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failureHeading">Oops! Something Went Wrong</h1>
      <p className="failureText">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retryButton"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case modes.inProgress:
        return this.renderLoaderView()
      case modes.success:
        return this.renderSuccessView()
      case modes.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderJobDetails()}
      </div>
    )
  }
}

export default JobItemDetailsRoute
