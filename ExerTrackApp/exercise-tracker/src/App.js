import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar';
import Exercises from './components/userExercises';
import AddExercise from './components/addExercise';
import EditExercise from './components/editExercise';
import SignIn from './components/signIn';
import CreateUser from './components/createUser';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Route exact path="/" component={Exercises}/>
        <Route path="/add-exercise" component={AddExercise}/>
        <Route path="/edit-exercise/:id" component={EditExercise}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/createUser" component={CreateUser}/>
      </div>
    </BrowserRouter>
  );
}
export default App;
