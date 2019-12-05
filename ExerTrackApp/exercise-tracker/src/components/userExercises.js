import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class UserExercises extends Component{
    state = {
        exercises:[]
    }
    componentDidMount(){
        axios.get('http://localhost:8080/exercises')
        .then(resp =>{
            if(resp.data.length>0){
                this.setState({
                    exercises:resp.data
                })
            }
        })
        .catch(err =>{
            throw err;
        })
    }

    deleteExercise(id){
        console.log("inside delete exercise");
        axios.delete('http://localhost:8080/exercises/delete/'+id)
        .then(resp=>{

           // window.location('/');

           this.setState({
               exercises: this.state.exercises.filter(exercise =>{
                   return exercise._id !== id
               })
           })
        })
        .catch(err =>{
            throw err;
        })
    }
    render(){
     const exerciseHtml = this.state.exercises.map(exercise=>{
         return(
             <tr>
                <td>{exercise.username}</td>
                <td>{exercise.description}</td>
                <td>{exercise.duration}</td>
                <td>{exercise.date.substring(0,10)}</td>
                <td>
                <Link to={"/edit-exercise/"+exercise._id}>edit</Link> | <a href="#" onClick={()=>{this.deleteExercise(exercise._id)}}>delete</a>
                </td>
            </tr>
         )
     });

        return(
            <div className="container">
                <h3>Logged Exercises</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exerciseHtml}
                </tbody>
                </table>
      </div>
        )
    }
}

export default UserExercises;