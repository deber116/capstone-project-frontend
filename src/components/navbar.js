import Nav from 'react-bootstrap/Nav'
import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { connect } from 'react-redux';

class NavBar extends Component {
    
    handleOnPortfoliosClick = () => {
        if (this.props.token) {
            this.props.history.push('/portfolios')
        }
    }

    handleOnDashboardClick = () => {
        if (this.props.token) {
            this.props.history.push('/dashboard')
        }
    }

    render() {
        return(
            <Navbar bg="dark" variant="dark" >
                <Navbar.Brand onClick={this.handleOnDashboardClick}>TCG Buying Assistant</Navbar.Brand>
                <Nav className="mr-auto">
                {this.props.token?
                <>
                    <Nav.Link onClick={this.handleOnDashboardClick}>Dashboard</Nav.Link>
                    <Nav.Link onClick={this.handleOnPortfoliosClick}>Portfolios</Nav.Link>
                    <Nav.Link onClick={this.handleOnPortfoliosClick} className="justify-content-end">Logout</Nav.Link>
                </>
                :
                <>
                </>
                }
                
                </Nav>
            </Navbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.user.token
    }
}

export default connect(mapStateToProps)(NavBar)