import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  logOutButton = () => {
    const propsData = this.props
    const {history} = propsData
    Cookies.remove('jwtToken')
    history.replace('/login')
  }

  render() {
    return (
      <nav className="navBarContainer">
        <div className="appLogoContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="appLogo"
          />
        </div>
        <ul className="navBarLists">
          <Link to="/" className="homeTabs">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="homeTabs">
            <li>Jobs</li>
          </Link>
        </ul>
        <div className="logoutButtonContainer">
          <button
            type="button"
            className="logoutButton"
            onClick={this.logOutButton}
          >
            LogOut
          </button>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
