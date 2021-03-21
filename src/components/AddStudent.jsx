import React from 'react'
import { Alert, Button, Col, Form, Row, Spinner, Container } from 'react-bootstrap'

class AddStudentForm extends React.Component {
    state = {
        newStudent: {
            name: '',
            surname: '',
            email: '',
            dateOfBirth: '',
        },
        errMessage: '',
        loading: false
    }

    updatenewStudentField = (e) => {
        let newStudent = { ...this.state.newStudent }
        let currentId = e.currentTarget.id 
            newStudent[currentId] = e.currentTarget.value 
    
        this.setState({ newStudent: newStudent })
    }

    submitnewStudent = async (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        try {
            let response = await fetch('http://localhost:3001/students/',
                {
                    method: 'POST',
                    body: JSON.stringify(this.state.newStudent),
                    headers: new Headers({
                        "Content-Type": "application/json"
                    })
                })
            if (response.ok) {
                alert('newStudent saved!')
                this.setState({
                    newStudent: {
                        name: '',
                        surname: '',
                        email: '',
                        dateOfBirth: '',
                    },
                    errMessage: '',
                    loading: false
                })
            } else {
                console.log('an error occurred')
                let error = await response.json()
                this.setState({
                    errMessage: error.message,
                    loading: false,
                })
            }
        } catch (e) {
            console.log(e) // Error
            this.setState({
                errMessage: e.message,
                loading: false,
            })
        }
    }

    
    render() {
        return (
            <div>
                {
                     this.state.loading && (
                        <div className="d-flex justify-content-center my-5">
                            Sendin your infos pls wait
                            <div className="ml-2">
                                <Spinner animation="border" variant="success" />
                            </div>
                        </div>
                    )
                }
                {
                      this.state.errMessage ? (
                        <Alert variant="danger">
                            We encountered a problem with your request
                            {this.state.errMessage}
                        </Alert>
                  
                    ):
                
                (
                <Container className="d-flex justify-content-center align-items-center text-center">
                <Form className="w-100 mb-5 mt-5 d-flex justify-content-center align-items-center text-center" style={{flexDirection:"column"}} onSubmit={this.submitnewStudent}>
                    <Row>
                        <Col >
                            <Form.Group>
                                <Form.Label htmlFor="name">Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Your name"
                                    value={this.state.newStudent.name}
                                    onChange={this.updatenewStudentField}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        </Row>
                        <Row>
                        <Col>
                            <Form.Group>
                            <Form.Label htmlFor="surname">Surname</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="surname"
                                    id="surname"
                                    placeholder="Your surname"
                                    value={this.state.newStudent.surname}
                                    onChange={this.updatenewStudentField}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                     
                            <Form.Group>
                            <Form.Label htmlFor="email">Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Your email"
                                    value={this.state.newStudent.email}
                                    onChange={this.updatenewStudentField}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        </Row>
                        <Row>
                        <Col >
                            <Form.Group>
                                <Form.Label htmlFor="dateOfBirth">Date of birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dateOfBirth"
                                    id="dateOfBirth"
                                    placeholder="Date of bith"
                                    value={this.state.newStudent.dateOfBirth}
                                    onChange={this.updatenewStudentField}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button type="submit">Submit</Button>
                </Form>
                </Container>
                )
            }
            </div>
        )
    }
}

export default AddStudentForm