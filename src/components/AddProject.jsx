import React, { Component } from 'react'
import { Alert, Button, Col, Form, Row, Spinner, Container } from 'react-bootstrap'
import SingleProject from './SingleProject';

export default class AddProject extends Component {
    state = {
        newProject: {
            name: '',
            description: '',
            creationDate: '',
            repoURL: '',
            liveURL: '',
            studentId: this.props.match.params.id,
        },
        errMessage: '',
        loading: false,
        projects:[],
    }


    fetchProjects = async () => {
        try {
            const url = `http://localhost:3001/students/${this.state.newProject.studentId}/projects/`
            const response = await fetch(url,
                {
                    method: "GET",
                })
            if (response.ok) {
                const data = await response.json();
                await this.setState({ projects: data });
                console.log(this.state.projects);
            }
        } catch (e) {
            console.log(e);
            console.log(this.state.newProject.studentId)
        }
    };
    componentDidMount = async () => {
        this.fetchProjects();
    };

    updatenewProjectField = (e) => {
        let newProject = { ...this.state.newProject }
        let currentId = e.currentTarget.id
        newProject[currentId] = e.currentTarget.value
        this.setState({ newProject: newProject })
    }


    submitnewProject = async (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        try {
            let response = await fetch('http://localhost:3001/projects/',
                {
                    method: 'POST',
                    body: JSON.stringify(this.state.newProject),
                    headers: new Headers({
                        "Content-Type": "application/json"
                    })
                })
            if (response.ok) {
                this.fetchProjects();
                alert('newProject saved!')
                this.setState({
                    newProject: {
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
                                <Form className="w-100 mb-5 mt-5 d-flex justify-content-center align-items-center text-center" style={{ flexDirection: "column" }} onSubmit={this.submitnewProject}>
                                    <Row>
                                        <Col >
                                            <Form.Group>
                                                <Form.Label htmlFor="name">Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    placeholder="Your name"
                                                    value={this.state.newProject.name}
                                                    onChange={this.updatenewProjectField}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label htmlFor="description">Description</Form.Label>
                                              <Form.Control as="textarea" rows={3} 
                                                 type="text"
                                                 name="description"
                                                 id="description"
                                                 placeholder="Describe ur project..."
                                                 value={this.state.newProject.description}
                                                 onChange={this.updatenewProjectField}
                                                 required/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >

                                            <Form.Group>
                                                <Form.Label htmlFor="repoURL">repoURL</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="repoURL"
                                                    id="repoURL"
                                                    placeholder="Your repo url"
                                                    value={this.state.newProject.repoURL}
                                                    onChange={this.updatenewProjectField}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >

                                            <Form.Group>
                                                <Form.Label htmlFor="liveURL">liveURL</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="liveURL"
                                                    id="liveURL"
                                                    placeholder="Your repo url"
                                                    value={this.state.newProject.liveURL}
                                                    onChange={this.updatenewProjectField}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >
                                            <Form.Group>
                                                <Form.Label htmlFor="creationDate">Creation date</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="creationDate"
                                                    id="creationDate"
                                                    placeholder="creation date"
                                                    value={this.state.newProject.creationDate}
                                                    onChange={this.updatenewProjectField}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button type="submit">Submit</Button>
                                </Form>
                            </Container>

                            <h1 className="mb-5">Projects</h1>
                            <Container className="mb-5 d-flex justify-content-center align-items-center text-center">
                                <Row className="mb-5">
                                    {this.state.projects && this.state.projects.length>0 ? (this.state.projects.map((project)=><SingleProject project={project} props={this.props}/>))
                                    : (   <Alert variant="danger">
                                    <Alert.Heading>We're sorry, still no projects here!</Alert.Heading>  
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

