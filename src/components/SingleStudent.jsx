import React, { Component } from 'react'
import {BsPencil, BsTrash} from 'react-icons/bs';
import {AiFillFolderAdd} from 'react-icons/ai';

export default class SingleStudent extends Component {
    handleDelete = async (id) => {

        const url= "http://localhost:3001/students/"
        const res = await fetch( url + id, {
          method: "DELETE",
        })
        if (res.ok) {
          alert("student deleted");
          this.props.fetchStudents();
        }
      }
    
    render() {
        return (
                <tr>
                    <td>{this.props.student.ID}</td>
                    <td>{this.props.student.name}</td>
                    <td>{this.props.student.surname}</td>
                    <td>{this.props.student.email}</td>
                    <td>{this.props.student.dateOfBirth}</td>
                    <td><BsPencil onClick={() =>this.props.props.history.push('/updateform/' + this.props.student.ID)}/></td>
                    <td><BsTrash onClick={()=>this.handleDelete(this.props.student.ID)}/></td>
                    <td><AiFillFolderAdd onClick={()=> this.props.props.history.push('/addproject/' + this.props.student.ID)}/></td>
                </tr>
        )
    }
}
