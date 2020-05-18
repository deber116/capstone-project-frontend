import React, { Component } from 'react';
import Search from '../components/search'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect } from 'react-redux';

class Dashboard extends Component {
    //contains chart
    //contains search bar and results 
    //contains grid with cards for products and portfolios being followed
    render () {
        return (
            <Container fluid="sm">
                <Row>
                    <Col>
                        < Search />
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default Dashboard