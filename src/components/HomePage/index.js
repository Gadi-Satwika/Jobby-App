import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class HomePage extends Component {
  render() {
    return (
      <div className="homePage">
        <Header />
        <div className="homePageHeadingsContainer">
          <h1 className="homePageTitle">Find The Job That Fits Your Life</h1>
          <p className="homePageCaption">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your ability and potential.
          </p>
          <Link to="/jobs" className="hometabs">
            <button type="button" className="findJobsButton">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default HomePage
