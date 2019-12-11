import React, { Component } from 'react';
import axios from 'axios';
class activeProjects extends Component {
    state = {
        projects: []
    }
    componentDidMount = (e) => {
        axios.get('http://localhost:8080/projects/activeprojects/')
            .then(resp => {
                console.log(resp.data);
                this.setState({
                    projects: resp.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    projectDetails=(id)=>{
        window.location = '/projectdetails/'+id;
    }
    render() {
            const projects = this.state.projects;
            const projectTableHtml = projects.map(project => {
                return (
                    <tr key={project._id}>
                        <td>{project.projectname}</td>
                        <td>{project.description}</td>
                        <td>{project.client}</td>
                    </tr>
                )
            })
            return (
                <div className="container">
                    <p className="dashboardcomptitle">Active Projects</p>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Project Name</th>
                                <th>Project Description</th>
                                <th>Client</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectTableHtml}
                        </tbody>
                    </table>
                </div>
            )
    }
}

export default activeProjects;