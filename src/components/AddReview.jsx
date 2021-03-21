import React, { Component } from 'react'
import { Alert, Button, Col, Form, Row, Spinner, Container } from 'react-bootstrap'
import SingleReview from './SingleReview';

export default class AddReview extends Component {
    state = {
        newReview: {
            name: '',
            comment: '',
            suggestions: '',
            projectId: this.props.match.params.id,
        },
        errMessage: '',
        loading: false,
        reviews:[],
    }


    fetchReviews = async () => {
        try {
            const url = `http://localhost:3001/projects/${this.state.newReview.projectId}/reviews/`
            const response = await fetch(url,
                {
                    method: "GET",
                })
            if (response.ok) {
                const data = await response.json();
                await this.setState({ reviews: data });
                console.log(this.state.reviews);
            }
        } catch (e) {
            console.log(e);
            console.log(this.state.newReview.projectId)
        }
    };
    componentDidMount = async () => {
        this.fetchReviews();
    };

    updatenewReviewField = (e) => {
        let newReview = { ...this.state.newReview }
        let currentId = e.currentTarget.id
        newReview[currentId] = e.currentTarget.value
        this.setState({ newReview: newReview })
    }


    submitnewReview = async (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        try {
            let response = await fetch('http://localhost:3001/reviews/',
                {
                    method: 'POST',
                    body: JSON.stringify(this.state.newReview),
                    headers: new Headers({
                        "Content-Type": "application/json"
                    })
                })
            if (response.ok) {
                this.fetchReviews();
                alert('New Review saved!')
                this.setState({
                    newReview: {
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

                    ) :

                        (<>
                            <Container className="d-flex justify-content-center align-items-center text-center w-100">
                                <Form className="w-100 mb-5 mt-5 d-flex justify-content-center align-items-center text-center" style={{ flexDirection: "column" }} onSubmit={this.submitnewReview}>
                                    <Row>
                                        <Col >
                                            <Form.Group>
                                                <Form.Label htmlFor="name">Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    placeholder="Your name"
                                                    value={this.state.newReview.name}
                                                    onChange={this.updatenewReviewField}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label htmlFor="comment">Comment</Form.Label>
                                              <Form.Control as="textarea" rows={3} 
                                                 type="text"
                                                 name="comment"
                                                 id="comment"
                                                 placeholder="What do u think about this project?"
                                                 value={this.state.newReview.comment}
                                                 onChange={this.updatenewReviewField}
                                                 required/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >

                                        <Form.Group>
                                                <Form.Label htmlFor="suggestions">Suggestions</Form.Label>
                                              <Form.Control as="textarea" rows={3} 
                                                 type="text"
                                                 name="suggestions"
                                                 id="suggestions"
                                                 placeholder="What can we improve?"
                                                 value={this.state.newReview.suggestions}
                                                 onChange={this.updatenewReviewField}
                                                 required/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button type="submit">Submit</Button>
                                </Form>
                            </Container>

                            <h1 className="mb-5">reviews</h1>
                            <Container className="mb-5 d-flex justify-content-center align-items-center text-center">
                                <Row className="mb-5">
                                    {this.state.reviews && this.state.reviews.length>0 ? (this.state.reviews.map((review)=><SingleReview review={review}/>))
                                    : (   <Alert variant="danger">
                                    <Alert.Heading>We're sorry, still no reviews here!</Alert.Heading>  
                                  </Alert>)
                                    }
                                </Row>
                            </Container>
                            </>
                        )
                }
            </div>
        )
    }
}

