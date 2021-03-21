import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import SingleStudent from './SingleStudent';

export default class StudentList extends Component {
    state = {
        students: [],
    }

    fetchStudents = async (titles) => {
        try {
            const url = "http://localhost:3001/students"
            const response = await fetch(url,
                {
                    method: "GET",
                }
            );
            if (response.ok) {
                const data = await response.json();
                this.setState({ students: data });
            }
        } catch (e) {
            console.log(e);
        }
    };
    componentDidMount = async () => {
        this.fetchStudents();
    };

  
    render() {
        return (
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Date of birth</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.students.map((student) =>
                            <SingleStudent student={student} fetchStudents={this.fetchStudents} props={this.props.props}/>
                        )
                    }


                </tbody>
            </Table>

        )
    }
}
