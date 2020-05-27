import Nav from 'react-bootstrap/Nav'
import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { connect } from 'react-redux';
import { clearSearch } from '../actions/searchActions';
import { logout } from '../actions/userActions';
import ls from 'local-storage'

class NavBar extends Component {
    
    handleOnPortfoliosClick = () => {
        if (this.props.token) {
            this.props.clearSearch()
            this.props.history.push('/portfolios/create')
        }
    }

    handleOnDashboardClick = () => {
        if (this.props.token) {
            this.props.clearSearch()
            this.props.history.push('/dashboard')
        }
    }

    handleOnLogoutClick = () => {
        ls.clear()
        this.props.logout()
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
                    
                
                </>
                :
                    null
                }
                
                </Nav>
                {this.props.token?
                    <Nav className="ml-auto">
                        <Nav.Link onClick={this.handleOnLogoutClick} className="justify-content-end">Logout</Nav.Link>
                    </Nav>
                :
                    null
                }
            </Navbar>
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
        clearSearch: () => {
            dispatch(clearSearch())
        },
        logout: () => {
            dispatch(logout())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)