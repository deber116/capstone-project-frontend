import React, { Component } from 'react';
import Search from '../components/search'
import Watchlist from '../components/watchlist'
import WatchlistChart from '../components/watchlistChart'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect } from 'react-redux';

class Dashboard extends Component {
    state = {
        selectedCard: null
    }
    //contains chart
    //contains search bar and results 
    //contains grid with cards for products and portfolios being followed
    componentDidMount = () => {
        console.log("success")
    }
    render () {
        return (
            <Container fluid="sm">
                <Row>
                    <Col xs={12}>
                        <WatchlistChart />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        < Watchlist />
                    </Col>
                    <Col>
                        < Search />
                    </Col>
                </Row>
                
            </Container>
        )
    }

}

export default Dashboard