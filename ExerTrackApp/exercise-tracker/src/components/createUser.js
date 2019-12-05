import React,{Component} from 'react';
import axios from 'axios';
class CreateUser extends Component{
    state = {
        username:''
    }
    onChangeInput =(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    onSubmit =(e)=>{
        axios.post('http://localhost:8080/users/add',this.state)
        .then(resp =>{
            this.setState({
                username:''
            })
        })
        .catch(err =>{
            throw err;
        })
    }
    render(){
        return(
            <div className="container">
                <h3>Create User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" required className="form-control" id="username" onChange={this.onChangeInput}
                         value={this.state.username}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={this.onSubmit}>Create User</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateUser;