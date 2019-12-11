import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
class signin extends Component {
    state = {
        employeeid: "",
        password: ""
    }
    onChangeInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    signIn = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/auth/signin', this.state)
            .then(resp => {
                if (resp.data.status === "success") {
                    console.log('loggin success');
                    localStorage.setItem('employeeObj', JSON.stringify(resp.data.employeeObj));
                    window.location = '/';
                }
            })
            .catch(err => {
                console.log(err);
                console.log("login failed");
            })
    }
    render() {
        const employeeObj = localStorage.getItem('employeeObj');
        console.log(JSON.parse(employeeObj));
        if (!employeeObj) {
            return (
                <div>
                    <header className='appHeader'>
                        <h3>Project Manager</h3>
                    </header>
                    <div className="signin-wrapper">
                        <div className="signin-inner">
                            <h3 className="center">SignIn</h3>
                            <form onSubmit={this.signIn}>
                                <div className="form-group">
                                    <label>Employee Id</label>
                                    <input id="employeeid" className="form-control" value={this.state.userid} type="text" onChange={this.onChangeInput} />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input id="password" className="form-control" value={this.state.password} type="password" onChange={this.onChangeInput} />
                                </div>
                                <div className="center">
                                    <button className="btn btn-primary" onClick={this.signIn}>SignIn</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            //window.location = "/"
            return(<Redirect to="/"/>);

        }
    }
}
export default signin;