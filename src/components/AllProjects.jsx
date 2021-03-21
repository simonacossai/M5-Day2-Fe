import React, { Component } from 'react'
import {Container, Row, Col, Media, FormControl} from 'react-bootstrap' 
import './SingleProject.css';

export default class AllProjects extends Component {
    state={
        projects: [],
        input: '',
        array:[],
    }
    fetchProjects = async () => {
        try {
            const url = `http://localhost:3001/projects/`
            const response = await fetch(url,
                {
                    method: "GET",
                })
            if (response.ok) {
                const data = await response.json();
                await this.setState({ projects: data });
                this.state.array.push(...data);
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
    FindProject = (query) => {
        const clone = { ...this.state.projects };
        this.setState({ input: query })
        if (this.state.input.length > 1) {
          let filteredProjects = this.state.projects.filter((project) =>
            project.name.toLowerCase().includes(this.state.input.toLowerCase())
          );
          this.setState({ projects: filteredProjects });
        } else {
          this.setState({ projects: this.state.array});
        }
      };
    render() {
        return (
            <Container>
              <FormControl
              className="ml-4"
              placeholder="Search movies"
              aria-label="Search"
              style={{ width: "200px" }}
              value={this.state.input}
              onChange={(e) => this.FindProject(e.target.value)}
            />
    {this.state.projects && this.state.projects.map((project)=> 
    <Media className="mt-2 mediaProject">
    <img
      width={64}
      height={64}
      className="mr-3"
      src="http://placehold.it/30x30"
      alt="Generic placeholder"
    />
    <Media.Body>
      <h5>{project.name}</h5>
      <p>
       {project.description}
      </p>
    </Media.Body>
  </Media>
    )}
            </Container>
        )
    }
}
