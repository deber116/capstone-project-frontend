import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import LoginPage from './components/login'
import { connect } from 'react-redux';
import Dashboard from './containers/dashboard'
import ls from 'local-storage'


class App extends Component {
  state = {
    loggedIn: false
  }

  componentDidMount = () => {
    if (ls.get("token")) {
      this.setState({
        loggedIn: true
      })
    }
  }

  render() {
    return (
      <Router>
          <div className="App">
            <Route exact path="/login" render={routerProps => <LoginPage {...routerProps}/>} />
            {this.state.loggedIn?
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

export default connect(mapStateToProps)(App);
