import React, { Component } from 'react';
import PortfolioCreate from '../components/portfolioCreate'
import { Route } from 'react-router-dom';

class Portfolios extends Component {
    render() {
        return(
            <div>
                <Route path="/portfolios/create" render={routerProps => <PortfolioCreate {...routerProps}/>} />
            </div>
        )
    }
}

export default Portfolios