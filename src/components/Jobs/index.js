import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

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
    profileDetails: [],
    employmentType: [],
    salary: '',
    searchInputUser: '',
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const api = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, options)
    const data = await response.json()
    const updatedData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    this.setState({
      profileDetails: updatedData,
    })
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

  getJobRecommendations = async () => {
    const {employmentType, salary, searchInputUser} = this.state
    console.log(searchInputUser)
    const employmentTypeSelected = employmentType.join(',')
    const api = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeSelected}&minimum_package=${salary}&search=${searchInputUser}`
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
    } else {
      console.log('Got error')
    }
  }

  getUserSearch = event => {
    this.setState({
      searchInputUser: event.target.value,
    })
  }

  getRecommedationsForUserSearch = () => {
    this.getJobRecommendations()
  }

  render() {
    const {profileDetails, employmentType} = this.state
    console.log(employmentType)
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div>
        <Header />
        <div className="jobsPageContainer">
          <div className="profileBarContainer">
            <div className="profileContainer">
              <img
                src={profileImageUrl}
                alt="profile"
                className="profileImage"
              />
              <h1 className="userName">{name}</h1>
              <p className="shortBio">{shortBio}</p>
            </div>
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
                placeholder="Search"
                onChange={this.getUserSearch}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.getRecommedationsForUserSearch}
              >
                <BsSearch className="searchIcon" />
              </button>
            </div>
            <div className="eachJobDetailsContainer">
              <p>EachJob</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
