import {Switch, Route, Redirect} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './components/HomePage'
import Jobs from './components/Jobs'
import JobItemDetailsRoute from './components/JobItemDetailsRoute'
import NotFound from './components/NotFound'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={HomePage} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetailsRoute} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
