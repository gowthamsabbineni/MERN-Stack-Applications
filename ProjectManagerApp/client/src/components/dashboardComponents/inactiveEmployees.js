import React, { Component } from 'react';
import axios from 'axios';
class inActiveEmployees extends Component {
    state = {
        employees: []
    }
    componentDidMount = (e) => {
        axios.get('http://localhost:8080/employees/inactiveemployees/')
            .then(resp => {
                console.log(resp.data);
                this.setState({
                    employees: resp.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    projectDetails=(id)=>{
        window.location = '/employeedetails/'+id;
    }
    render() {
            const employees = this.state.employees;
            const employeeTableHtml = employees.map(employee => {
                return (
                    <tr key ={employee.employeeid}>
                        <td>{employee.firstname} {employee.lastname}</td>
                        <td>{employee.employeeid}</td>
                        <td>{employee.role}</td>
                        <td>{employee.email}</td>
                    </tr>
                )
            })
            return (
                <div className="container">
                    <p className="dashboardcomptitle">In-Active Employees</p>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Employee Name</th>
                                <th>Id</th>
                                <th>Role</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeTableHtml}
                        </tbody>
                    </table>
                </div>
            )
    }
}

export default inActiveEmployees;