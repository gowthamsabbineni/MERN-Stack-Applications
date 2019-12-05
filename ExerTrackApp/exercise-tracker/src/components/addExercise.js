import React,{Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
class AddExercise extends Component{
    state = {
            username:'',
            description:'',
            duration:'',
            date:new Date(),
            users:[]
    }
    onChangeInput =(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    onChangeDate =(date)=>{
        this.setState({
            date:date
        })
    }
    onSubmit =(e)=>{
        e.preventDefault();
        if(this.state.username===''){
            this.setState({
                username:document.getElementById('username').value
            })
        }

        console.log(this.state);
        const exerciseObj = {
            username:this.state.username,
            description:this.state.description,
            duration:this.state.duration,
            date:this.state.date
        }
        axios.post('http://localhost:8080/exercises/add',exerciseObj)
        .then(resp =>{
            window.location = '/';
        })
        .catch(err =>{
            throw err;
        })
    }
    componentDidMount(){
        axios.get('http://localhost:8080/users')
        .then((resp)=>{
            if(resp.data.length >0){
                this.setState({
                    users: resp.data.map(user =>{
                        return user.username
                    }),
                    username:resp.data[0].username
                })
            }
        })
        .catch(err =>{
            console.log(err);
        })
    }
    render(){
        return(
            <div className="container">
                <form onSubmit={this.onSubmit}>
                    <h3>Create Exercise Log</h3>
                    <div className="form-group">
                        <label>Username:</label>
                        <select ref="userInput" required className="form-control" value={this.state.username}
                         onChange={this.onChangeInput} id="username">
                            {
                                this.state.users.map(function(user) {
                                return <option key={user} value={user}>{user}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text" required className="form-control" value={this.state.description}
                         id="description" onChange={this.onChangeInput}/>
                    </div>
                    <div className="form-group"> 
                        <label>Duration(In mins): </label>
                        <input  type="text" required className="form-control" value={this.state.duration}
                         id="duration" onChange={this.onChangeInput}/>
                    </div>
                    <div className="form-group"> 
                        <label>Date: </label>
                        <DatePicker id="date" selected={this.state.date} onChange={this.onChangeDate}/>
                    </div>
                    <div className="form-group">
                        {/* <input type="submit" value="Add Exercise" className="btn btn-primary"/> */}
                        <button className="btn btn-primary" onClick={this.onSubmit}>Create</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddExercise;