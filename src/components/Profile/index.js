import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const modes = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN-PROGRESS',
  initial: 'INITIAL',
}

class Profile extends Component {
  state = {
    profileDetails: [],
    statusProfile: modes.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({
      statusProfile: modes.inProgress,
    })
    const api = 'https://apis.ccbp.in/profile'
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
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        statusProfile: modes.success,
      })
    } else {
      this.setState({
        statusProfile: modes.failure,
      })
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profileContainer">
        <img src={profileImageUrl} alt="profile" className="profileImage" />
        <h1 className="userName">{name}</h1>
        <p className="shortBio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failureViewContainer">
      <button
        type="button"
        className="retryButton"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderProfileDetails = () => {
    const {statusProfile} = this.state
    switch (statusProfile) {
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
    return <div>{this.renderProfileDetails()}</div>
  }
}

export default Profile
