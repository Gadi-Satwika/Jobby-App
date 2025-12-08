import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
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
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="homeTabs">
            <li>Jobs</li>
          </Link>
          <li className="logoutButtonContainer">
            <button
              type="button"
              className="logoutButton"
              onClick={this.logOutButton}
            >
              LogOut
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

export default withRouter(Header)
