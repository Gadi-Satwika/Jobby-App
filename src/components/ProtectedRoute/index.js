import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'

class ProtectedRoute extends Component {
  render() {
    const propsData = this.props
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return <Route {...propsData} />
  }
}

export default ProtectedRoute
