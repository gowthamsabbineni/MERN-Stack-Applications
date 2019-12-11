import React,{Component} from 'react';
import { Link } from 'react-router-dom';
class navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to='/' className="navbar-brand">Project Manager</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to='/employees' className="nav-link">Employees</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to='/createemployee' className="nav-link">Create Employee</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to='/projects' className="nav-link">Projects</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to='/createproject' className="nav-link">Create Project</Link>
                        </li>
                        <li className="navbar-item"> 
                            <p className="welcometxt">Welcome,Gowtham Sabbineni</p>
                        </li>
                        <li className="navbar-item">
                            <Link to='/signout' className="nav-link">SignOut</Link>
                        </li>
                        
                    </ul>
                </div>
            </nav>
        )
    }
}
export default navbar;