import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'
import { connect } from 'react-redux';
import { searchCards, addCardToWatchlist, clearSearch } from '../actions/searchActions';

class Search extends Component {
    state = {
        searchTerm: '',
        showXButton: false
    }

    handleOnSearchTermChange = event => {
        this.setState({
            searchTerm: event.target.value
        })
    }

    handleOnSearch = () => {
        this.props.searchCards(this.state.searchTerm, this.props.token)
        this.setState({
            showXButton: true
        })
    }

    handleOnXClick = () => {
        this.setState({
            showXButton: false,
            searchTerm: ''
        })
        this.props.clearSearch()
    }

    handleOnAdd = card => {
        this.props.addCardToWatchlist(card, this.props.token)
        this.setState({
            searchTerm: '',
            showXButton: false
        })
    }
    
    isSearchedCardAlreadyInList = card => {
        let addedToList = false 
        this.props.cards.map(pcard => {
            if (pcard.product_id === card.product_id) {
                addedToList = true
            }
        })
        return addedToList
    }

    updateAddButtonTest = card => {
        if (this.isSearchedCardAlreadyInList(card)) {
            return "Already added to watchlist"
        } else {
            return "+"
        }
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
                                    <p>
                                        {card.name} - {card.set_name} ({card.rarity})
                                    </p>
                                    <Button variant="outline-secondary" size="xs" onClick={() => this.handleOnAdd(card)} disabled={this.isSearchedCardAlreadyInList(card)}>
                                        {this.updateAddButtonTest(card)}
                                    </Button>
                                </Media.Body>
                            </Media>
                        </Card.Body>
                    </Card>
                </ListGroup.Item>
            )
        })
    }

    render() {
        return (
            <div>
                <Container fluid="sm">
                    <Row>
                        <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <Button variant="secondary" onClick={this.handleOnSearch}>Search Card</Button>
                            </InputGroup.Prepend>
                            <FormControl value={this.state.searchTerm} onChange={this.handleOnSearchTermChange}/>
                            {this.state.showXButton?
                                <InputGroup.Append>
                                    <Button variant="danger" onClick={this.handleOnXClick}>X</Button>
                                </InputGroup.Append>
                            :
                                null
                            }
                        </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ListGroup className="search-listgroup" variant="flush">
                                {this.props.loader?
                                    <ListGroup.Item>"Searching..."</ListGroup.Item>
                                :
                                    this.createCards()
                                }
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        )   
    }
    
}
const mapStateToProps = state => {
    return {
        token: state.user.token,
        searchedCards: state.search.searchedCards,
        loader: state.search.loader,
        cards: state.watchlist.watchlistCards,
    } 
}

const mapDispatchToProps = dispatch => {
    return {
        searchCards: (searchTerm, authToken) => {
            dispatch(searchCards(searchTerm, authToken))
        }, 
        addCardToWatchlist: (card, authToken) => {
            dispatch(addCardToWatchlist(card, authToken))
        },
        clearSearch: () => {
            dispatch(clearSearch())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);