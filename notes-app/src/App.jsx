import { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NotesCrud from './conponents/NotesCrud'; //Crud commponent
import NavBar from './conponents/NavBar'; //nav
import Login from './conponents/Login'; //login
import Notes from './conponents/Notes' //ADMIN
import Reset from './conponents/Reset'; //reset


function App() {
  
  return (
      <Router>
        <div className="container">
          <NavBar/>
          <Switch>
          <Route path="/login" exact>
            <Login/>
          </Route>
          <Route path="/reset" exact>
            <Reset/>
          </Route>
          <Route path="/notes" exact>
            <Notes/>
          </Route>
          <Route path="/" exact>
            Inicio
          </Route>
          </Switch>
        </div>
        <Login/>
      </Router>
      
      
  );
}

export default App;
