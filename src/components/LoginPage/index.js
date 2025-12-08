import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', errorMsg: '', error: false}

  usernameInput = event => {
    this.setState({
      username: event.target.value,
    })
  }

  passwordInput = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitCredentials = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const api = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(api, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({
        error: true,
        errorMsg: data.error_msg,
      })
    }
  }

  render() {
    const {username, password, errorMsg, error} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="totalLoginPage">
        <form className="loginForm" onSubmit={this.onSubmitCredentials}>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="formAppLogo"
            />
          </div>
          <label htmlFor="username" className="labelName">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="inputFields"
            placeholder="Username"
            onChange={this.usernameInput}
            value={username}
          />
          <label htmlFor="password" className="labelName">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="inputFields"
            placeholder="Password"
            value={password}
            onChange={this.passwordInput}
          />
          <button type="submit" className="formLoginButton">
            Login
          </button>
          <div className="errorDisplayContainer">
            {error && <p className="errorMessage">*{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default LoginPage
