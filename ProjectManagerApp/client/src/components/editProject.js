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
                            project:resp.data,
                            managers:this.state.managers
                        })
                    })
                    .catch(err => {
                        console.log("fetch project failed", err);
                    })
                })
                .catch(err => {
                    console.log("fetch managers failed", err);
                })
            })
            .catch(err => {
                console.log("fetch employees failed", err);
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
    getSelectedTeamMembers = function(){
        const teamMembers = this.state.project.projectmembers;
        const Arr =[]
        if(teamMembers.length>0){
            for(var i=0;i<teamMembers.length;i++){
                const obj = {};
                obj.value = teamMembers[i].employeeid;
                obj.label = teamMembers[i].name;
                obj.role = teamMembers[i].role;
                Arr.push(obj);
            }
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
    onSave =(e)=>{
        e.preventDefault();
        const project = this.state.project;
        console.log(project);
        axios.post('http://localhost:8080/projects/editproject/'+project._id,project)
        .then(resp=>{
            window.location = '/projects'
        })
        .catch(err=>{
            console.log("edit project failed");
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
            const multiselectdata = this.teamSelectOptions(); // To get the options Object for team members dropdown
            const selectedTeammembers = this.getSelectedTeamMembers();
            return (
                <div className="container">
                    <h3>Edit Project</h3>
                    <form onSubmit={this.onSave}>
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
                                    value={selectedTeammembers}
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
                        <button className="btn btn-primary" onClick={this.onSave}>Save</button>
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