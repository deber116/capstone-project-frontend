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
import { toggleWatchlist } from '../actions/watchlistActions';


class PortfolioCreate extends Component {
    state = {
        portfolioName: "",
        description: "",
        searchTerm: "",
        portfolioCards: [],
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
        this.props.toggleWatchlist("cards")
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
                method: "POST",
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

            fetch('http://localhost:3001/portfolios', postConfigObj)
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
                                    <p>{card.name} - {card.set_name} ({card.rarity})</p>
                                        
                                        <InputGroup className="mb-3 justify-content-center">
                                            <InputGroup.Prepend>
                                                <Button variant="secondary" onClick={this.handleOnQuantityDecrease} disabled={this.quantityLessThanZero()}>-</Button>
                                                <InputGroup.Text>{this.state.quantitySelected}</InputGroup.Text>
                                            
                                            </InputGroup.Prepend>
                                            <InputGroup.Append>
                                                <Button variant="secondary" onClick={this.handleOnQuantityIncrease}>+</Button>
                                            </InputGroup.Append>
                                            
                                        </InputGroup>
                                        <Button variant="outline-secondary" onClick={() => {this.handleOnAdd(card, this.state.quantitySelected)}} disabled={this.isSearchedCardAlreadyInList(card)} className="btn-portfolio">
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
                <Form.Group >
                    <Form.Label>Portfolio Name</Form.Label>
                    <Form.Control type="username" placeholder="Portfolio name" value={this.state.portfolioName} onChange={this.handleOnPortfolioNameChange}/>
                    
                </Form.Group>

                <Form.Group >
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Portfolio description" value={this.state.description} onChange={this.handleOnDescriptionChange}/>
                </Form.Group>
                <Row>
                    <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <Button variant="info" onClick={this.handleOnSearch}>Search Card</Button>
                        </InputGroup.Prepend>
                        <FormControl value={this.state.searchTerm} onChange={this.handleOnSearchTermChange}/>
                    </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup className="portfolio-create-search-listgroup" variant="flush">
                            {this.props.loader?
                                <ListGroup.Item>"Searching..."</ListGroup.Item>
                            :
                                this.createCards()
                            }
                        </ListGroup>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                <Button className="btn-block btn-submit-portfolio" variant="info" type="submit" onClick={this.handleOnSubmit}>
                    Save Portfolio
                </Button>
                </Row>
            </Form>
            </Col>
            <Col>
                <Row className="justify-content-center">
                    <h1 style={{"font-family": "Avenir"}}>Cards in your Portfolio</h1>
                </Row>
                <ListGroup id="portfolio-cards-listgroup">
                    {this.state.portfolioCards.length > 0?
                        this.renderSelectedCards()
                    :
                        <ListGroup.Item>
                            <p style={{"text-align": "center"}}>Use the search feature to find cards to add to this portfolio</p>
                        </ListGroup.Item>
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
        loader: state.search.loader
    } 
}

const mapDispatchToProps = dispatch => {
    return {
        searchCards: (searchTerm, authToken) => {
            dispatch(searchCards(searchTerm, authToken))
        },
        clearSearch: () => {
            dispatch(clearSearch())
        },
        toggleWatchlist: toggle => {
            dispatch(toggleWatchlist(toggle))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioCreate)