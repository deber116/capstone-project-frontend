import React, { Component } from 'react';
import PortfolioCreate from '../components/portfolioCreate'
import PortfolioEdit from '../components/portfolioEdit'
import { Route } from 'react-router-dom';

class Portfolios extends Component {
    render() {
        return(
            <div>
                <Route path="/portfolios/create" render={routerProps => <PortfolioCreate {...routerProps}/>} />
                <Route path={"/portfolios/edit/:portfolioId"} render={routerProps => <PortfolioEdit {...routerProps}/>} />
            </div>
        )
    }
}

export default Portfolios