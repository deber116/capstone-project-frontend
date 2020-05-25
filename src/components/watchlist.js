import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Media from 'react-bootstrap/Media'
import { watchlistCards, selectCard, subtractWatchlistCard, moreInfo } from '../actions/watchlistActions';


class Watchlist extends Component {
    renderCardsOnWatchlist = () => {
        return this.props.cards.map(card => {
            
            return(
                <ListGroup.Item>
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
                                    <Button variant="outline-secondary" size="xs" onClick={() => this.handleOnXCLick(card)}>
                                        X
                                    </Button>
                                    <Button variant="outline-secondary" onClick={this.handleOnMoreInfoClick}>
                                        More Info
                                    </Button>
                                </Media.Body>
                            </Media>
                        </Card.Body>
                    </Card>
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
                priceZero.edition+ ": $"+ priceZero.amount+ "   " + priceOne.edition + ": $" + priceOne.amount
            )
        } else if (lastPull.edition == "1st Edition"){
            priceZero = lastPull
            return(
                priceZero.edition+ ": $"+ priceZero.amount
            )
        } else {
            priceZero = secondLastPull
            return(
                priceZero.edition+ ": $"+ priceZero.amount
            )
        }

    }

    handleOnMoreInfoClick = () => {
        this.props.moreInfo()
        this.props.history.push(`/dashboard/1`)
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

    getCardsOnWatchlist = () => {
        this.props.watchlistCards(this.props.token)
    }

    //might need to have this happen in update
    componentDidMount = () => {
        this.getCardsOnWatchlist()
    }



    render () {
        return(
            <div>
                <ListGroup id="watchlist-listgroup">
                    {this.props.loader?
                        "Loading..."
                    :
                        this.renderCardsOnWatchlist()
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
        selectedCard: state.watchlist.selectedCard
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist)