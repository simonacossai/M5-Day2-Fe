import React, { Component } from 'react'
import { Col, Card, Button } from 'react-bootstrap'
import './SingleProject.css';

export default class SingleProject extends Component {
    render() {
        return (
            <Col className="mt-2 mr-3">
                <Card style={{ width: '18rem'}} onClick={() =>this.props.props.history.push('/reviews/' + this.props.project.ID)}>
                    <Card.Body>
                        <Card.Title>{this.props.project.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{this.props.project.creationDate}</Card.Subtitle>
                        <Card.Text className="projectDescription">
                           {this.props.project.description}
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}
