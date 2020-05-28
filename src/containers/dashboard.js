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
import { toggleWatchlist, selectCard, selectPortfolio } from '../actions/watchlistActions';

class Dashboard extends Component {
    state = {
        selectedCard: null
    }
    //contains chart
    //contains search bar and results 
    //contains grid with cards for products and portfolios being followed
    

    handleWatchlistToggleCards = () => {
        if (this.props.watchlistToggle === "cards") {
            return "info"
        } else {
            return "outline-info"
        }
    }

    handleWatchlistTogglePortfolios = () => {
        if (this.props.watchlistToggle === "portfolios") {
            return "info"
        } else {
            return "outline-info"
        }
    }

    clickCardsButton = () => {
        if (this.props.cards.length > 0) {
            this.props.selectCard(this.props.cards[0])
        }
        this.props.toggleWatchlist("cards")
    }

    clickPortfoliosButton = () => {
        if (this.props.portfolios.length > 0) {
            this.props.selectPortfolio(this.props.portfolios[0])
        }
        this.props.toggleWatchlist("portfolios")
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
                        <Row className="justify-content-center">
                            <InputGroup className="mb-3 justify-content-center">                
                                <InputGroup.Prepend>
                                    <Button  variant={this.handleWatchlistToggleCards()} onClick={this.clickCardsButton}>Individual Cards</Button>
                                </InputGroup.Prepend>
                                <InputGroup.Append>
                                    <Button variant={this.handleWatchlistTogglePortfolios()} onClick={this.clickPortfoliosButton}>Portfolios</Button>
                                </InputGroup.Append>
                            </InputGroup>
                            < Watchlist history={this.props.history}/>
                        </Row>
                        }
                    </Col>
                    <Col sm={8}>
                        
                        
                            <Container >
                                <Row>
                                    <Col sm={12}>
                                        <WatchlistChart />
                                    </Col>
                                </Row>
                                
                                    <ShowCard history={this.props.history} />
                                
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
        watchlistToggle: state.watchlist.watchlistToggle,
        cards: state.watchlist.watchlistCards,
        portfolios: state.watchlist.portfolios
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleWatchlist: toggle => {
            dispatch(toggleWatchlist(toggle))
        },
        selectCard: card => {
            dispatch(selectCard(card))
        },
        selectPortfolio: portfolio => {
            dispatch(selectPortfolio(portfolio))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)