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
import Tab from 'react-bootstrap/Tab'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { toggleWatchlist } from '../actions/watchlistActions';

class Dashboard extends Component {
    state = {
        selectedCard: null
    }
    //contains chart
    //contains search bar and results 
    //contains grid with cards for products and portfolios being followed

    handleWatchlistToggleCards = () => {
        if (this.props.watchlistToggle === "cards") {
            return "secondary"
        } else {
            return "outline-secondary"
        }
    }

    handleWatchlistTogglePortfolios = () => {
        if (this.props.watchlistToggle === "portfolios") {
            return "secondary"
        } else {
            return "outline-secondary"
        }
    }
    
    render () {
        return (
            <Container fluid >
                <Row>
                    <Col sm={4}>
                    
                        <Search />
                        {this.props.searching?
                            null
                        :
                        <>
                            <InputGroup className="mb-3">                
                                <InputGroup.Prepend>
                                    <Button  variant={this.handleWatchlistToggleCards()} onClick={() => this.props.toggleWatchlist("cards")}>Individual Cards</Button>
                                </InputGroup.Prepend>
                                <InputGroup.Append>
                                    <Button variant={this.handleWatchlistTogglePortfolios()} onClick={() => this.props.toggleWatchlist("portfolios")}>Portfolios</Button>
                                </InputGroup.Append>
                            </InputGroup>
                            < Watchlist history={this.props.history}/>
                        </>
                        }
                    </Col>
                    <Col sm={8}>
                        
                        
                            <Container >
                                <Row>
                                    <Col sm={12}>
                                        <WatchlistChart />
                                    </Col>
                                </Row>
                                {this.props.selectedCard?
                                    <ShowCard history={this.props.history} />
                                :
                                    null
                                }
                            </Container>
                        
                    </Col>
                </Row>
            </Container>
        )
    }

}

const mapStateToProps = state => {
    return {
        moreInfo: state.watchlist.moreInfo,
        selectedCard: state.watchlist.selectedCard,
        searching: state.search.searching,
        watchlistToggle: state.watchlist.watchlistToggle
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleWatchlist: toggle => {
            dispatch(toggleWatchlist(toggle))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)