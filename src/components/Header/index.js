import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

class Header extends Component {
  logOutButton = () => {
    const propsData = this.props
    const {history} = propsData
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <nav className="navBarContainer">
        <div className="appLogoContainer">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="appLogo"
            />
          </Link>
        </div>
        <ul className="navBarLists">
          <Link to="/" className="homeTabs">
            <li className="homeLarge">Home</li>
            <AiFillHome className="navIcon" />
          </Link>
          <Link to="/jobs" className="homeTabs">
            <li className="jobsLarge">Jobs</li>
            <BsBriefcaseFill className="navIcon" />
          </Link>
          <li className="logoutButtonContainer">
            <button
              type="button"
              className="logoutButton"
              onClick={this.logOutButton}
            >
              <span className="logoutButtonLarge">LogOut</span>
              <FiLogOut className="logoutIcon" />
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

export default withRouter(Header)
