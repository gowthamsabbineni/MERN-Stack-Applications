import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import SignIn from './components/signIn';
import SignOut from './components/signOut';
import Navbar from './components/navbar'
import Dashboard from './components/dashboard';
import ProjectsList from './components/projectsList';
import EmployeesList from './components/employeesList';
import CreateEmployee from './components/createEmployee';
import ProjectDetails from './components/projectDetails';
import EmployeeDetails from './components/employeeDetails';
import EditEmployee from './components/editEmployee';
import EditProject from './components/editProject';
import CreateProject from './components/createProject';

class App extends Component {
  render() {
    const employeeObj = localStorage.getItem('employeeObj');
    if (employeeObj) {
      return (
        <BrowserRouter>
          <div className="App">
            <Navbar />
          </div>
          <Route exact path='/' component={Dashboard} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signout' component={SignOut} />
           <Route path='/projects' component={ProjectsList} />
          <Route path='/employees' component={EmployeesList} />
          <Route path='/createemployee' component={CreateEmployee} />
          <Route path='/employeedetails/:id' component={EmployeeDetails} />
          <Route path='/editemployee/:id' component={EditEmployee} />
          <Route path='/createproject' component={CreateProject} />
          <Route path='/projectdetails/:id' component={ProjectDetails} />
          <Route path='/editproject/:id' component={EditProject} /> 
        </BrowserRouter>
      );
    }
    else {
      return(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      )
    }
  }
}

export default App;
