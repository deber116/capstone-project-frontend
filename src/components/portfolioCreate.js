import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Media from 'react-bootstrap/Media'
import { connect } from 'react-redux';
import { searchCards, addCardToWatchlist } from '../actions/searchActions';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Dropdown from 'react-bootstrap/Dropdown'

class PortfolioCreate extends Component {
    state = {
        portfolioName: "",
        description: "",
        searchTerm: "",
        portfolioCards: [],
        quantitySelected: 1
    }

    handleOnPortfolioNameChange = event => {
        this.setState({
          username: event.target.value
        });
    }

    handleOnDescriptionChange = event => {
        this.setState({
          password: event.target.value
        });
    }
    handleOnSearchTermChange = event => {
        this.setState({
            searchTerm: event.target.value
        })
    }

    handleOnSearch = () => {
        this.props.searchCards(this.state.searchTerm, this.props.token)
        
    }

    handleOnAdd = (card, quantity) => {
        console.log("clicked")
        let newCard = {...card, quantity}
        this.setState(prevState => {
            return {
                portfolioCards: [...prevState.portfolioCards, newCard]
            }
        })
        
    }

    handleOnQuantityDecrease = () => {
        this.setState(prevState => {
            return {
                quantitySelected: (prevState.quantitySelected - 1)
            }
        })
    }

    handleOnQuantityIncrease = () => {
        console.log("+")
        this.setState(prevState => {
            return {
                quantitySelected: (prevState.quantitySelected + 1)
            }
        })
    }

    quantityLessThanZero = () => {
        return (this.state.quantitySelected < 1)
    }

    renderSelectedCards = () => {
        return this.state.portfolioCards.map(card => {
            return(
                <ListGroup.Item>
                    <p>
                        {card.name}-{card.set_name}          x{card.quantity} 
                        
                        <Button variant="danger" onClick={() => this.handleOnRemove(card)}>
                            Remove
                        </Button>
                    </p>
                </ListGroup.Item>
            )
        })
    }

    handleOnRemove = card => {

    }

    handleOnSubmit = event => {
        event.preventDefault()
    }

    isSearchedCardAlreadyInList = card => {
        let addedToList = false 
        this.state.portfolioCards.map(pcard => {
            if (pcard.product_id === card.product_id) {
                addedToList = true
            }
        })
        return addedToList
    }

    createCards = () => {
        return this.props.searchedCards.map(card => {
            
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
                                <Media.Body className="text-center">
                                    <p>{card.name} - {card.set_name}</p>
                                    <div>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <Button onClick={this.handleOnQuantityDecrease} disabled={this.quantityLessThanZero()}>-</Button>
                                                <InputGroup.Text>{this.state.quantitySelected}</InputGroup.Text>
                                            
                                            </InputGroup.Prepend>
                                            <InputGroup.Append>
                                                <Button onClick={this.handleOnQuantityIncrease}>+</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                        </div>
                                        <Button onClick={() => {this.handleOnAdd(card, this.state.quantitySelected)}} disabled={this.isSearchedCardAlreadyInList(card)}>
                                            Add to Portfolio
                                        </Button>
                                    
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
            <Container>
            <Row>
            <Col>
            <Form>
                
                <Form.Group controlId="portfolioInputName">
                    <Form.Label>Portfolio Name</Form.Label>
                    <Form.Control type="username" placeholder="Portfolio name" value={this.state.portfolioName} onChange={this.handleOnPortfolioNameChange}/>
                    
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="textArea" placeholder="Portfolio description" value={this.state.description} onChange={this.handleOnDescriptionChange}/>
                </Form.Group>
                <Row>
                    <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <Button variant="secondary" onClick={this.handleOnSearch}>Search Card</Button>
                        </InputGroup.Prepend>
                        <FormControl value={this.state.searchTerm} onChange={this.handleOnSearchTermChange}/>
                    </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup className="search-listgroup">
                            {this.props.loader?
                                <ListGroup.Item>"Searching..."</ListGroup.Item>
                            :
                                this.createCards()
                            }
                        </ListGroup>
                    </Col>
                </Row>
                
                <Button variant="primary" type="submit" onClick={this.handleOnSubmit}>
                    Submit
                </Button>
            </Form>
            </Col>
            <Col>
                <ListGroup id="portfolio-cards-listgroup">
                    {this.renderSelectedCards()}
                </ListGroup>
            </Col>
            </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.user.token,
        searchedCards: state.search.searchedCards,
        loader: state.search.loader
    } 
}

const mapDispatchToProps = dispatch => {
    return {
        searchCards: (searchTerm, authToken) => {
            dispatch(searchCards(searchTerm, authToken))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioCreate)