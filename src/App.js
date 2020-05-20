import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import LoginPage from './components/login'
import SignupPage from './components/signup'
import { connect } from 'react-redux';
import Dashboard from './containers/dashboard'
import ls from 'local-storage'
import { signIn } from './actions/userActions';


class App extends Component {

  componentDidMount = () => {
    console.log("app mounted")
    if (ls.get("token")) {
      const getConfigObj = {
        method: "GET",
        headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Authorization": `Bearer ${ls.get("token")}`
        }
      }

      fetch('http://localhost:3001/profile', getConfigObj)
      .then(resp => resp.json())
      .then(
          user => {
            console.log(user)
            this.props.signIn(user)
          }
      )
    }
  }

  render() {
    return (
      <Router>
          <div className="App">
            <Route exact path="/login" render={routerProps => <LoginPage {...routerProps}/>} />
            <Route exact path="/signup" render={routerProps => <SignupPage {...routerProps}/>} />
            {this.props.token?
            <Route exact path="/dashboard" render={routerProps => <Dashboard {...routerProps}/>} />
            :
            <Redirect to="/login" />
            }

          </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: user => {
      dispatch(signIn(user))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
