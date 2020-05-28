import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Media from 'react-bootstrap/Media'
import { 
    watchlistCards, 
    selectCard, 
    subtractWatchlistCard, 
    moreInfo,
    getPortfolios,
    deletePortfolio,
    selectPortfolio,
    selectPortfolioCard
 } from '../actions/watchlistActions';
 import { clearSearch } from '../actions/searchActions';
 import Accordion from 'react-bootstrap/Accordion'
 import { Link } from 'react-router-dom';


class Watchlist extends Component {
    renderCardsOnWatchlist = () => {
        return this.props.cards.map(card => {
            
            return(
                <ListGroup.Item >
                    <Card bg={this.checkIfClicked(card)} onClick={() => this.props.selectCard(card)}>
                        <Card.Body>
                            <Media>
                                <img
                                width={44}
                                height={64}
                                className="align-self-center mr-3"
                                src={card["img_url"]}
                                alt="Generic placeholder"
                                />
                                <Media.Body className="text-center">
                                    <p>{card.name} - {card.set_name} ({card.rarity}) </p>
                                    <p>{this.renderPrices(card)}</p>
                                    
                                    <Link onClick={() => this.handleOnXCLick(card)}>Remove from watchlist</Link>
                                    
                                </Media.Body>
                            </Media>
                        </Card.Body>
                    </Card>
                </ListGroup.Item>
            )
        })
    }

    renderPortfoliosOnWatchlist = () => {
        return this.props.portfolios.map(portfolio => {
            
            return(
                <ListGroup.Item>
                    <Accordion>
                    <Card bg={this.checkIfPortfolioClicked(portfolio)} onClick={() => this.handleOnPortfolioCardClick(portfolio)}>
                    
                        <Card.Body>
                            <Media>
                                <Media.Body className="text-center">
                                    <p>Portfolio: {portfolio.name} </p>
                                    <p>{this.renderPrices(portfolio)}</p>
                                    <Button variant="outline-secondary" size="xs" onClick={() => this.handleOnPortfolioDelete(portfolio)}>
                                        Delete
                                    </Button>
                                    <Button variant="outline-secondary" size="xs" onClick={() => this.handleOnPortfolioUpdate(portfolio)}>
                                        Update
                                    </Button>
                                    <Accordion.Toggle as={Button} variant="outline-secondary" eventKey="0">
                                         See Description
                                    </Accordion.Toggle>
                                    
                                </Media.Body>
                                
                            </Media>
                            
                        </Card.Body>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body><p>{portfolio.description}</p></Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    
                    </Accordion>
                </ListGroup.Item>
            )
        })

    }
    renderPrices = card => {
        //prices come back where last is most recent
        let lastPull = card.recent_prices[card.recent_prices.length - 1]
        let secondLastPull = card.recent_prices[card.recent_prices.length - 2]
        let priceZero = null
        let priceOne = null

        if (lastPull.edition !== secondLastPull.edition) {
            priceZero = lastPull
            priceOne = secondLastPull
            return(
                priceZero.edition + ": $" + priceZero.amount.toFixed(2) + "   " + priceOne.edition + ": $" + priceOne.amount.toFixed(2)
            )
        } else if (lastPull.edition == "1st Edition"){
            priceZero = lastPull
            return(
                priceZero.edition + ": $" + priceZero.amount.toFixed(2)
            )
        } else {
            priceZero = secondLastPull
            return(
                priceZero.edition + ": $" + priceZero.amount.toFixed(2)
            )
        }

    }

    handleOnPortfolioCardClick = portfolio => {
        
        this.props.selectPortfolio(portfolio)
        
        this.props.selectPortfolioCard(portfolio.cards[0])
        
    }

    handleOnPortfolioUpdate = portfolio => {
        this.props.history.push(`/portfolios/edit/${portfolio.id}`)
    }

    handleOnPortfolioDelete = portfolio => {
        this.props.deletePortfolio(portfolio, this.props.token)
    }


    handleOnXCLick = card => {
        this.props.subtractWatchlistCard(card, this.props.token)
    }

    checkIfClicked = card => {
        if (card == this.props.selectedCard){
            return "light"
        } else {
            return ""
        }
    }

    checkIfPortfolioClicked = portfolio => {
        if (portfolio == this.props.selectedPortfolio){
            return "light"
        } else {
            return ""
        }
    }
    getPortfolios = () => {
        this.props.getPortfolios(this.props.token)
        this.props.clearSearch()
    }

    getCardsOnWatchlist = () => {
        this.props.watchlistCards(this.props.token)
        
    }

    //might need to have this happen in update
    componentDidMount = () => {
        this.getCardsOnWatchlist()
        this.getPortfolios()
    }



    render () {
        return(
            <div>
                <ListGroup id="watchlist-listgroup" variant="flush">
                    {this.props.loader?
                        "Loading..."
                    :
                    
                    <>
                        {(this.props.watchlistToggle === "cards")?
                            this.renderCardsOnWatchlist()
                        :
                            this.renderPortfoliosOnWatchlist()
                        }
                    </>
                    }
                </ListGroup>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        token: state.user.token,
        cards: state.watchlist.watchlistCards,
        loader: state.watchlist.loader,
        selectedCard: state.watchlist.selectedCard,
        portfolios: state.watchlist.portfolios,
        watchlistToggle: state.watchlist.watchlistToggle,
        selectedPortfolio: state.watchlist.selectedPortfolio
    }
}

const mapDispatchToProps = dispatch => {
    return {
        watchlistCards:  authToken => {
            dispatch(watchlistCards(authToken))
        },
        selectCard: card => {
            dispatch(selectCard(card))
        },
        subtractWatchlistCard: (card, authToken) => {
            dispatch(subtractWatchlistCard(card, authToken))
        },
        moreInfo : () => {
            dispatch(moreInfo())
        },
        getPortfolios:  authToken => {
            dispatch(getPortfolios(authToken))
        },
        deletePortfolio: (portfolio, authToken) => {
            dispatch(deletePortfolio(portfolio, authToken))
        },
        clearSearch: () => {
            dispatch(clearSearch())
        },
        selectPortfolio: portfolio => {
            dispatch(selectPortfolio(portfolio))
        },
        selectPortfolioCard: pcard => {
            dispatch(selectPortfolioCard(pcard))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist)