import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'

class Watchlist extends Component {
    state = {
        watchlistCards: []
    }

    renderCardsOnWatchlist = () => {
        return this.state.watchlistCards.map(card => {
            const priceZero = card.recent_prices[0]
            const priceOne = card.recent_prices[1]
            return(
                <ListGroup.Item>
                    <Card>
                        <Card.Body>
                            <Media>
                                <img
                                width={44}
                                height={64}
                                className="align-self-center mr-3"
                                src={card["img_url"]}
                                alt="Generic placeholder"
                                />
                                <Media.Body>
                                    <p>
                                        {card.name} - {card.set_name} ({card.rarity}) {priceZero.edition}: ${priceZero.amount}  {priceOne.edition}: ${priceOne.amount}
                                    </p>
                                </Media.Body>
                            </Media>
                        </Card.Body>
                    </Card>
                </ListGroup.Item>
            )
        })
    }

    getCardsOnWatchlist = () => {
        const getConfigObj = {
            method: "GET",
            headers: 
            {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Authorization": `Bearer ${this.props.token}`
            },
        }

        fetch('http://localhost:3001/watchlists', getConfigObj)
        .then(resp => resp.json())
        .then(response => {
            console.log(response)
            this.setState({
                watchlistCards: [...response]
            })
        })
    }

    componentDidMount = () => {
        this.getCardsOnWatchlist()
    }

    render () {
        return(
            <div>
                <h5>Watchlist</h5>
                <ListGroup>
                    {this.renderCardsOnWatchlist()}
                </ListGroup>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        token: state.user.token
    }
}

export default connect(mapStateToProps)(Watchlist)