import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import axios from 'axios';
class createProject extends Component {
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
        employees: [],
        managers: []
    }
    componentDidMount = (e) => {
        axios.get('http://localhost:8080/employees/teammembers')
            .then(resp => {
                this.setState({
                    employees: resp.data
                })
            })
            .catch(err => {
                console.log("fetch employees failed", err);
            })

        axios.get('http://localhost:8080/employees/managers')
            .then(resp => {
                this.setState({
                    managers: resp.data,
                    project: {
                        ...this.state.project,
                        manager: resp.data[0].employeeid
                    }
                })
            })
            .catch(err => {
                console.log("fetch managers failed", err);
            })
    }
    teamSelectOptions = function () {
        const Arr = []
        for (var i = 0; i < this.state.employees.length; i++) {
            const obj = {};
            obj.value = this.state.employees[i].employeeid
            obj.label = this.state.employees[i].firstname + ' ' + this.state.employees[i].lastname
            obj.role = this.state.employees[i].role
            Arr.push(obj);
        }
        return Arr;
    }
    onChangeInput = (e) => {
        this.setState({
            project: {
                ...this.state.project,
                [e.target.id]: e.target.value
            }
        })
        console.log(this.state);
    }
    onChangeDate = (date) => {
        console.log(date);
        this.setState({
            project: {
                ...this.state.project,
                startdate: date
            }
        })
    }
    onChangeMultiDD = (e) => {
        console.log(e);
        if(e){
        const Teamarr = e.map(obj => {
            return (
                {
                    employeeid: obj.value,
                    name: obj.label,
                    role: obj.role
                }
            )
        })
        this.setState({
            project: {
                ...this.state.project,
                projectmembers: Teamarr
            }
        })
        console.log(this.state);
        }
    }
    onCreate =(e)=>{
        e.preventDefault();
        const project = this.state.project;
        axios.post('http://localhost:8080/projects/createproject',project)
        .then(resp=>{
            window.location = '/projects'
        })
        .catch(err=>{
            console.log("create project failed");
        })
    }
    render() {
        const employeeObj = localStorage.getItem('employeeObj');
        const managerSelect = this.state.managers.map(employee => {
            return (
                <option value={employee.employeeid} role={employee.role} key={employee._id}>{employee.firstname + ' ' + employee.lastname} </option>
            )
        })
        if (employeeObj) {
            const multiselectdata = this.teamSelectOptions();
            //console.log(multiselectdata);
            return (
                <div className="container">
                    <h3>Create Project</h3>
                    <form onSubmit={this.onCreate}>
                        <div className="form-row">
                            <div className='form-group col-md-6'>
                                <label>Project Name</label>
                                <input className="form-control" id="projectname" onChange={this.onChangeInput} value={this.state.project.projectname}></input>
                            </div>
                            <div className='form-group col-md-6'>
                                <label>Project Description</label>
                                <input className="form-control" id="description" onChange={this.onChangeInput} value={this.state.project.description}></input>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className='form-group col-md-6'>
                                <label>Client</label>
                                <input className="form-control" id="client" onChange={this.onChangeInput} value={this.state.project.client}></input>
                            </div>
                            <div className='form-group col-md-6'>
                                <label>Status</label>
                                <select className="form-control" id="status" onChange={this.onChangeInput} value={this.state.project.status}>
                                    <option value="active">Active</option>
                                    <option value="on-hold">On Hold</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className='form-group col-md-6'>
                                <label>Manager</label>
                                <select className="form-control" id="manager" onChange={this.onChangeInput} value={this.state.project.manager}>
                                    {managerSelect}
                                </select>

                            </div>
                            <div className='form-group col-md-6'>
                                <label>Please select project team</label>
                                <Select onChange={(e) => { this.onChangeMultiDD(e) }}
                                    closeMenuOnSelect={false}
                                    defaultValue={[multiselectdata[0]]}
                                    isMulti
                                    options={multiselectdata}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className='form-group col-md-6'>
                                <label className="datepickerlabel">Start Date</label>
                                <DatePicker id="startdate" className="form-control" selected={this.state.project.startdate} onChange={this.onChangeDate} />
                            </div>
                        </div>
                        <div>
                        <button className="btn btn-primary" onClick={this.onCreate}>Create</button>
                    </div>
                    </form>
                </div>
            )
        }
        else {
            return (<Redirect to="/signin" />);
        }
    }
}

export default createProject;