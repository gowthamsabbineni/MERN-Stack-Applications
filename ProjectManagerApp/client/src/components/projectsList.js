import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import axios from 'axios';
class projectsList extends Component {
    state = {
        projects: []
    }
    componentDidMount = (e) => {
        axios.get('http://localhost:8080/projects/')
            .then(resp => {
                this.setState({
                    projects: resp.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    editProject =(e,id)=>{
        e.stopPropagation();
        window.location = 'editproject/'+id;
    }
    projectDetails=(id)=>{
        window.location = '/projectdetails/'+id;
    }
    render() {
        const employeeObj = localStorage.getItem('employeeObj');
        if (employeeObj) {
            const projects = this.state.projects;
            const projectCardHtml = projects.map(project=>{
                return(
                    <div className="card bg-light mb-3" onClick={()=>{this.projectDetails(project._id)}} key={project._id}>
                        <div className="card-header"><h5>{project.projectname}</h5></div>
                        <div className="card-body">
                            <div>
                                <h6>Description:</h6>
                                <p>{project.description}</p>
                            </div>
                            <div>
                                <h6>Client:</h6>
                                <p>{project.client}</p>
                            </div>
                            <div className="card-actions">
                                <button className="btn btn-primary"onClick={(e)=>{this.editProject(e,project._id)} }>Edit</button>
                            </div>
                        </div>
                        
                    </div>
                )
            })
            return (
                <div className="container">
                    {projectCardHtml}
                </div>
            )
        }
        else {
            return (<Redirect to="/signin" />);
        }
    }
}

export default projectsList;