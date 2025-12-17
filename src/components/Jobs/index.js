import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Profile from '../Profile'
import JobCard from '../JobCard'
import './index.css'

const modes = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN-PROGRESS',
  initial: 'INITIAL',
  notFound: 'NotFound',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    employmentType: '',
    salary: '',
    searchInputUser: '',
    jobs: [],
    jobStatus: modes.initial,
  }

  componentDidMount() {
    this.getJobRecommendations()
  }

  getEmploymentType = event => {
    const temp = event.target.id
    if (event.target.checked) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, temp],
        }),
        this.getJobRecommendations,
      )
    } else {
      this.setState(
        prevState => ({
          employmentType: prevState.employmentType.filter(
            eachOne => eachOne !== temp,
          ),
        }),
        this.getJobRecommendations,
      )
    }
  }

  getSalaryRange = event => {
    const temp = event.target.id
    if (event.target.checked) {
      this.setState(
        {
          salary: temp,
        },
        this.getJobRecommendations,
      )
    } else {
      this.setState(
        {
          salary: '',
        },
        this.getJobRecommendations,
      )
    }
  }

  getUserSearch = event => {
    this.setState({
      searchInputUser: event.target.value,
    })
  }

  getJobRecommendations = async () => {
    this.setState({
      jobStatus: modes.inProgress,
    })
    const {employmentType, salary, searchInputUser} = this.state
    console.log(searchInputUser)
    const employmentTypeSelected =
      employmentType !== '' ? employmentType.join(',') : ''
    const api = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeSelected}&minimum_package=${salary}&search=${searchInputUser}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data.jobs.length)
      if (data.jobs.length === 0) {
        this.setState({
          jobStatus: modes.notFound,
        })
      } else {
        const updatedData = data.jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          packagePerAnnum: eachJob.package_per_annum,
          rating: eachJob.rating,
          title: eachJob.title,
          id: eachJob.id,
        }))
        this.setState({
          jobs: updatedData,
          jobStatus: modes.success,
        })
      }
    } else {
      this.setState({
        jobStatus: modes.failure,
      })
    }
  }

  getRecommedationsForUserSearch = () => {
    this.getJobRecommendations()
  }

  renderNotFoundView = () => (
    <div className="failureView">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="failureHeading">No Jobs Found</h1>
      <p className="failureText">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container-jobs" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failureView">
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
        onClick={this.getJobRecommendations}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobs} = this.state
    return (
      <ul className="eachJobDetailsContainer">
        {jobs.map(eachJob => (
          <JobCard jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderJobs = () => {
    const {jobStatus} = this.state
    switch (jobStatus) {
      case modes.inProgress:
        return this.renderLoaderView()
      case modes.success:
        return this.renderSuccessView()
      case modes.failure:
        return this.renderFailureView()
      case modes.notFound:
        return this.renderNotFoundView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="totalPage">
        <Header />
        <div className="jobsPageContainer">
          <div className="profileBarContainer">
            <Profile />
            <hr className="hrLine" />
            <h1 className="typesOfEmploymentHeading">Type of Employment</h1>
            <ul className="employmentTypeListContainer">
              {employmentTypesList.map(eachType => (
                <li
                  className="employmentTypeList"
                  key={eachType.employmentTypeId}
                >
                  <input
                    type="checkbox"
                    id={eachType.employmentTypeId}
                    onChange={this.getEmploymentType}
                  />
                  <label htmlFor={eachType.employmentTypeId}>
                    {eachType.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="hrLine" />
            <h1 className="typesOfEmploymentHeading">Salary Range</h1>
            <ul className="employmentTypeListContainer">
              {salaryRangesList.map(eachType => (
                <li className="employmentTypeList" key={eachType.salaryRangeId}>
                  <input
                    type="radio"
                    id={eachType.salaryRangeId}
                    name="salary"
                    onChange={this.getSalaryRange}
                  />
                  <label htmlFor={eachType.salaryRangeId} name="salary">
                    {eachType.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="jobDetailsContainer">
            <div className="searchContainer">
              <input
                type="search"
                className="searchBar"
                placeholder="search"
                role="searchbox"
                onChange={this.getUserSearch}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.getRecommedationsForUserSearch}
                className="searchIconButton"
              >
                <BsSearch className="searchIcon" />
              </button>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
