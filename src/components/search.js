import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import { connect } from 'react-redux';
import { searchCards } from '../actions/searchActions';

class Search extends Component {
    state = {
        searchTerm: ''
    }

    handleOnSearchTermChange = event => {
        this.setState({
            searchTerm: event.target.value
        })
    }

    handleOnSearch = () => {
        this.props.searchCards(this.state.searchTerm, this.props.token)
        console.log(this.props.searchedCards)
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
                        </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Card>
                                        <Card.Body>This is some text within a card body.</Card.Body>
                                    </Card>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Card>
                                        <Card.Body>This is some text within a card body.</Card.Body>
                                    </Card>
                                </ListGroup.Item>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);