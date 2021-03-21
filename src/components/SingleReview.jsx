import React, { Component } from 'react'
import { Col, Card, Button } from 'react-bootstrap'
import './SingleProject.css';

export default class SingleReview extends Component {
    render() {
        return (
            <Col className="mt-2 mr-3">
                <Card style={{ width: '18rem'}} >
                    <Card.Body>
                        <Card.Title>{this.props.review.name}</Card.Title>
                        <Card.Text className="projectDescription">
                           {this.props.review.comment}
                        </Card.Text>
                        <Card.Text className="projectDescription mt-2">
                           {this.props.review.suggestions}
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}
