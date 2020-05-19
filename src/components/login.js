import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { connect } from 'react-redux';
import { signIn } from '../actions/userActions';
import ls from 'local-storage'

class LoginPage extends Component {
    state = {
        username: "",
        password: "", 
        invalid: false
    }


    componentDidMount = () => {
        if (this.props.token) {
            this.props.history.push("/dashboard")
        }
    }

    checkAlert = () => {
        if (this.state.invalid) {
            return(
                <Alert variant="danger">
                    Invalid login credentials. Please try again. 
                </Alert>
            )
        }
    }

    
    handleOnUsernameChange = event => {
        this.setState({
          username: event.target.value
        });
    }

    handleOnPasswordChange = event => {
        this.setState({
          password: event.target.value
        });
    }

    handleOnSubmit = event => {
        event.preventDefault()

        const postConfigObj = {
            method: "POST",
            headers: 
            {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
                "user": {
                    "username": this.state.username,
                    "password": this.state.password
                }
            })
        }

        fetch('http://localhost:3001/login', postConfigObj)
        .then(resp => resp.json())
        .then(response => {
            console.log(response)
            if (response.user) {
                this.props.signIn(response)
                ls.set("token", response.jwt)
                this.props.history.push('/dashboard')
            } else {
                this.setState({
                    username: "",
                    password: "",
                    invalid: true
                })
            }
        })
        
    }

    render() {
        return(
        <div>
            {this.checkAlert()}
            <Form onSubmit={this.handleOnSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" value={this.state.username} onChange={this.handleOnUsernameChange}/>
                    
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handleOnPasswordChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.user.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: username => {
            dispatch(signIn(username))
        },
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)