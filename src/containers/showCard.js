import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'
import { lessInfo, selectPortfolioCard } from '../actions/watchlistActions'
import Media from 'react-bootstrap/Media'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'

class ShowCard extends Component {
    constructor () {
        super()
        this.state = {
            selectedCard: null
        }
    }
    

    handleOnCardClick = card => {
        this.setState({
            selectedCard: card
        })
    }
    checkIfClicked = card => {
        if (card == this.props.selectedPortfolioCard){
            return "light"
        } else {
            return ""
        }
    }

    renderCardsInPortfolio= () => {
        return this.props.selectedPortfolio.cards.map(card => {
            
            return(
                <ListGroup.Item >
                    <Card bg={this.checkIfClicked(card)} onClick={() => this.props.selectPortfolioCard(card)}>
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
                                    <p>Quantity: {card.quantity}</p>
                                </Media.Body>
                            </Media>
                        </Card.Body>
                    </Card>
                </ListGroup.Item>
            )
        })
    }

    render () {

        return (
            
                <Row id="card-info-row" >

                        {this.props.watchlistToggle == "cards"?
                            (this.props.watchlistCards.length > 0 && this.props.selectedCard)?
                            <>
                            <Col md={3} className="align-items-center my-auto">
                                <Row className="justify-content-center">
                                    <Image src={this.props.selectedCard.img_url} fluid className="w-75"/>
                                </Row>
                            </Col>
                            <Col md={9} float="left">
                                <h5>{this.props.selectedCard.name}</h5>
                                <p><strong>Booster Set:</strong> {this.props.selectedCard.set_name}</p>
                                <p><strong>Card Type:</strong> {this.props.selectedCard.card_type}</p>
                                <p><strong>Monster Type:</strong> {this.props.selectedCard.monster_type}</p>
                                <p><strong>Attribute:</strong> {this.props.selectedCard.attrbute}</p>
                                <p><strong>Rarity:</strong> {this.props.selectedCard.rarity}</p>
                                <p><strong>Attack:</strong> {this.props.selectedCard.attack}</p>
                                <p><strong>Defense:</strong> {this.props.selectedCard.defense}</p>
                                <p><strong>Description:</strong> <p>{this.props.selectedCard.description}</p></p>
                            </Col>
                            </>
                            :
                            <h1>You don't have any cards in your watchlist yet. Use the search bar above to search for cards and add them to your watchlist.</h1>
                        :
                            this.props.selectedPortfolio?
                            <>
                            <Col md={6} className="align-items-center">
                                <ListGroup id="watchlist-listgroup-small" variant="flush">
                                    {this.renderCardsInPortfolio()}
                                </ListGroup>
                            </Col>
                            {this.props.selectedPortfolioCard?
                                
                                
                                <Col md={6} float="left">
                                    <h5>{this.props.selectedPortfolioCard.name}</h5>
                                    <p><strong>Booster Set:</strong> {this.props.selectedPortfolioCard.set_name}</p>
                                    <p><strong>Card Type:</strong> {this.props.selectedPortfolioCard.card_type}</p>
                                    <p><strong>Monster Type:</strong> {this.props.selectedPortfolioCard.monster_type}</p>
                                    <p><strong>Attribute:</strong> {this.props.selectedPortfolioCard.attrbute}</p>
                                    <p><strong>Rarity:</strong> {this.props.selectedPortfolioCard.rarity}</p>
                                    <p><strong>Attack:</strong> {this.props.selectedPortfolioCard.attack}</p>
                                    <p><strong>Defense:</strong> {this.props.selectedPortfolioCard.defense}</p>
                                    <p><strong>Description:</strong> <p>{this.props.selectedPortfolioCard.description}</p></p>
                                </Col>
                                
                            :
                                null
                            }
                            </>
    
                        :
                            <h1>You don't have any portfolios. Use the "Portfolios" tab above to create a portfolio.</h1>
                        }
                    
                </Row>
                
            
        )
    }

}

const mapStateToProps = state => {
    return {
        selectedCard: state.watchlist.selectedCard,
        selectedPortfolio: state.watchlist.selectedPortfolio,
        selectedPortfolioCard: state.watchlist.selectedPortfolioCard,
        watchlistToggle: state.watchlist.watchlistToggle,
        portfolios: state.watchlist.portfolios,
        watchlistCards: state.watchlist.watchlistCards
    }
}

const mapDispatchToProps = dispatch => {
    return {
        lessInfo: () => {
            dispatch(lessInfo())
        },
        selectPortfolioCard: pcard => {
            dispatch(selectPortfolioCard(pcard))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCard)