import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'
import { lessInfo } from '../actions/watchlistActions'
import Media from 'react-bootstrap/Media'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'

class ShowCard extends Component {
    state = {
        selectedCard: null
    }

    handleOnCardClick = card => {
        this.setState({
            selectedCard: card
        })
    }

    renderCardsInPortfolio= () => {
        return this.props.selectedCard.cards.map(card => {
            
            return(
                <ListGroup.Item >
                    <Card onClick={() => this.handleOnCardClick(card)}>
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
        console.log(this.props.selectedCard)
        return (
            
                <Row id="card-info-row" >
                    
                        {this.props.selectedCard.product_id?
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
                        <Col md={6} className="align-items-center my-auto">
                            <ListGroup id="watchlist-listgroup" variant="flush">
                                {this.renderCardsInPortfolio()}
                            </ListGroup>
                        </Col>
                        }
                    
                </Row>
                
            
        )
    }

}

const mapStateToProps = state => {
    return {
        selectedCard: state.watchlist.selectedCard
    }
}

const mapDispatchToProps = dispatch => {
    return {
        lessInfo: () => {
            dispatch(lessInfo())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCard)