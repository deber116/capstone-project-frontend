import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'
import { lessInfo } from '../actions/watchlistActions'
import Media from 'react-bootstrap/Media'

class ShowCard extends Component {
    state = {
        selectedCard: null
    }

    handleOnLessInfoClick = () => {
        this.props.lessInfo()
        this.props.history.push('/dashboard')
    }

    render () {
        return (
            
                <Row >
                    <Col md={3} className="align-items-center">
                        <Row className="justify-content-center">
                        <Image src={this.props.selectedCard.img_url} fluid className="w-75"/>
                        <Button variant="secondary" onClick={this.handleOnLessInfoClick} >
                            Back to Watchlist
                        </Button>
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