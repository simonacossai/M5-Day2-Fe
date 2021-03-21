import React, { Component } from 'react'
import StudentList from './StudentList'
import {Container} from 'react-bootstrap';

export default class Home extends Component {
    render() {
        return (
            <Container className="mt-5">
                <StudentList props={this.props}/>
            </Container>
        )
    }
}
