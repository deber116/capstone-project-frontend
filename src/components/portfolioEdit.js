import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Media from 'react-bootstrap/Media'
import { connect } from 'react-redux';
import { searchCards, clearSearch } from '../actions/searchActions';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Alert from 'react-bootstrap/Alert'


class PortfolioEdit extends Component {
    state = {
        portfolioName: this.props.selectedPortfolio.name,
        description: this.props.selectedPortfolio.description,
        searchTerm: "",
        portfolioCards: this.props.selectedPortfolio.cards,
        quantitySelected: 1,
        invalid: false
    }

    checkAlert = () => {
        if (this.state.invalid) {
            return(
                <Alert variant="danger">
                    A portfolio needs a name and at least one card in order to be created. 
                </Alert>
            )
        }
    }

    handleOnPortfolioNameChange = event => {
        this.setState({
          portfolioName: event.target.value
        });
    }

    handleOnDescriptionChange = event => {
        this.setState({
          description: event.target.value
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
        let newCard = {
            name: card.name,
            set_name: card.set_name, 
            product_id: card.product_id, 
            quantity
        }
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
                        
                        <Button variant="danger" style={{float: "right"}} onClick={() => this.handleOnRemove(card)}>
                            Remove
                        </Button>
                    </p>
                </ListGroup.Item>
            )
        })
    }

    handleOnRemove = card => {
        const newPortfolioCards = this.state.portfolioCards.filter(pcard => {
            return pcard.product_id !== card.product_id
        })
        console.log(newPortfolioCards)
        this.setState({
            portfolioCards: newPortfolioCards
        })

    }

    handleOnSubmit = event => {
        event.preventDefault()
        if (this.state.portfolioName == "") {
            this.setState({
                invalid: true
            })
        } else if (this.state.portfolioCards.length === 0) {
            this.setState({
                invalid: true
            })
        } else {
            const postConfigObj = {
                method: "PATCH",
                headers: 
                {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Authorization": `Bearer ${this.props.token}`
                },
                body: JSON.stringify({
                    name: this.state.portfolioName,
                    description: this.state.description,
                    portfolioCards: this.state.portfolioCards
                })
            }

            fetch(`http://localhost:3001/portfolios/${this.props.selectedCard.id}`, postConfigObj)
            .then(resp => resp.json())
            .then(response => {
                this.props.clearSearch()
                this.props.history.push("/dashboard")
            })
        }
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
            <div className="portfolio-create">
            <Container fluid>
            <Row>
            <Col md={{ span: 4 }}>
            <Form>
                {this.checkAlert()}
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
                    Update Portfolio
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
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.user.token,
        searchedCards: state.search.searchedCards,
        loader: state.search.loader,
        selectedCard: state.watchlist.selectedCard,
        selectedPortfolio: state.watchlist.selectedPortfolio
    } 
}

const mapDispatchToProps = dispatch => {
    return {
        searchCards: (searchTerm, authToken) => {
            dispatch(searchCards(searchTerm, authToken))
        },
        clearSearch: () => {
            dispatch(clearSearch())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioEdit)