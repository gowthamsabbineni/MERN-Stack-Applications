import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
class projectDetails extends Component {
    state = {
        project: {
            projectname: '',
            description: '',
            client: '',
            startdate: new Date(),
            status: 'active',
            manager: '',
            projectmembers: [{
                employeeid: '',
                name: '',
                role: ''
            }]
        },
        managers: []
    }
    componentDidMount = (e) => {
        axios.get('http://localhost:8080/employees/managers')
            .then(resp => {
                this.setState({
                    managers: resp.data,
                    project: {
                        ...this.state.project,
                        manager: resp.data[0].employeeid
                    }
                })
                axios.get('http://localhost:8080/projects/'+this.props.match.params.id)
                .then(resp => {
                    resp.data.startdate = new Date(resp.data.startdate);
                    this.setState({
                        project:resp.data
                    })
                })
                .catch(err => {
                    console.log("fetch project failed", err);
                })
            })
            .catch(err => {
                console.log("fetch managers failed", err);
            })
    }
    deleteProject = (id) => {
        axios.post('http://localhost:8080/projects/delete/'+id)
            .then(resp => {
                window.location = '/projects'
            })
            .catch(err => {
                console.log("create project failed");
            })
    }
    editProject =(id)=>{
        window.location = '/editproject/'+id
    }
    render() {
        const employeeObj = localStorage.getItem('employeeObj');
        const managerSelect = this.state.managers.map(employee => {
            return (
                <option value={employee.employeeid} role={employee.role} key={employee._id}>{employee.firstname + ' ' + employee.lastname} </option>
            )
        })
        const projectTeamHtml = this.state.project.projectmembers.map(member=>{
            return(
                <tr key={member.employeeid}>
                    <td>{member.name}</td>
                    <td>{member.employeeid}</td>
                    <td>{member.role}</td>
                </tr>
            )
        })
        if (employeeObj) {
            return (
                <div className="container">
                    <h3>Project Details</h3>
                    <form>
                        <fieldset disabled>
                            <div className="form-row">
                                <div className='form-group col-md-6'>
                                    <label>Project Name</label>
                                    <input className="form-control" id="projectname" value={this.state.project.projectname}></input>
                                </div>
                                <div className='form-group col-md-6'>
                                    <label>Project Description</label>
                                    <input className="form-control" id="description"  value={this.state.project.description}></input>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className='form-group col-md-6'>
                                    <label>Client</label>
                                    <input className="form-control" id="client" value={this.state.project.client}></input>
                                </div>
                                <div className='form-group col-md-6'>
                                    <label>Status</label>
                                    <select className="form-control" id="status" value={this.state.project.status}>
                                        <option value="active">Active</option>
                                        <option value="on-hold">On Hold</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className='form-group col-md-6'>
                                    <label>Manager</label>
                                    <select className="form-control" id="manager" value={this.state.project.manager}>
                                        {managerSelect}
                                    </select>
                                </div>
                                <div className='form-group col-md-6'>
                                    <label className="datepickerlabel">Start Date</label>
                                    <DatePicker id="startdate" className="form-control" selected={this.state.project.startdate} />
                                </div>
                            </div>
                        </fieldset>
                    </form>
                    <h4>Project Team</h4>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Name</th>
                                <th>Employee Id</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectTeamHtml}
                        </tbody>
                    </table>
                    <div className="container buttonrow">
                        <button className="btn btn-primary "onClick={()=>this.deleteProject(this.state.project._id)}>Delete</button>
                        <button className="btn btn-primary "onClick={()=>this.editProject(this.state.project._id)}>Edit</button>
                    </div>
                </div>
            )
        }
        else {
            return (<Redirect to="/signin" />);
        }
    }
}

export default projectDetails;