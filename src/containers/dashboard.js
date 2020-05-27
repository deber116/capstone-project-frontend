import React, { Component } from 'react';
import Search from '../components/search'
import Watchlist from '../components/watchlist'
import ShowCard from './showCard'
import WatchlistChart from '../components/watchlistChart'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

class Dashboard extends Component {
    state = {
        selectedCard: null
    }
    //contains chart
    //contains search bar and results 
    //contains grid with cards for products and portfolios being followed
    
    render () {
        return (
            <Container >
                <Row>
                    <Col xs={12}>
                        <WatchlistChart />
                    </Col>
                </Row >
                {this.props.moreInfo?
                    <Route path={'/dashboard/:productId'} render={routerProps =>  <ShowCard {...routerProps} /> }/>
                :
                    <>
                    <Row>
                        <Col md={6}>
                            <h5>Watchlist</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            < Watchlist history={this.props.history}/>
                        </Col>
                        <Col>
                            < Search />
                        </Col>
                    </Row>
                    </>
                }
            </Container>
            
        )
    }

}

const mapStateToProps = state => {
    return {
        moreInfo: state.watchlist.moreInfo
    }
}

export default connect(mapStateToProps)(Dashboard)