import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
class employeesList extends Component {
    state = {
        employees: []
    }
    componentDidMount = (e) => {
        axios.get('http://localhost:8080/employees')
            .then(resp => {
                if (resp.data.length > 0) {
                    this.setState({
                        employees: resp.data
                    })
                }
            })
            .catch(err => {
                console.log("employees fetch error")
            })
    }
    employeeDetails =(id)=>{
        console.log("employee clicked");
        //<Redirect to={'/employeedetails/'+id} />
        window.location = '/employeedetails/'+id
    }
    editEmployee =(e,id)=>{
        //<Link to={'/editemployee/'+id}>Edit</Link>
        window.location = "/editemployee/"+id;
        e.stopPropagation();
    }
    render() {
        const employeeHtml = this.state.employees.map(employee => {
            return(
            <div className="card bg-light mb-3" key={employee._id} onClick={()=>{this.employeeDetails(employee._id)}}> 
                <div className="card-header"><h5>{employee.firstname + ' ' + employee.lastname}</h5></div>
                <div className="card-body">
                    <div className="col-md-6 card-body-left">
                        <h6>Employee Id:</h6>
                        <p>{employee.employeeid}</p>
                    </div>
                    <div className="col-md-6 card-body-right">
                        <h6>Role:</h6>
                        <p>{employee.role}</p>
                    </div>
                    <div className="card-actions">
                        <button className="btn btn-primary"onClick={(e)=>{this.editEmployee(e,employee._id)} }>Edit</button>
                        
                    </div>
                </div>
            </div> 
            )
        })
        const employeeObj = localStorage.getItem('employeeObj');
        if (employeeObj) {
            return (
                <div className="container">
                    {employeeHtml}
                </div>
            )
        }
        else {
            return (<Redirect to="/signin" />);
        }
    }
}

export default employeesList;