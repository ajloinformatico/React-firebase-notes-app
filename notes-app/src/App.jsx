import { useEffect, useState } from 'react';
import {auth} from './firebase'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavBar from './conponents/NavBar'; //nav
import Login from './conponents/Login'; //login
import Notes from './conponents/Notes' //ADMIN
import Reset from './conponents/Reset'; //reset


function App() {

  //UserState
  const [firebaseuser, setFirebaseuser] = useState(false)

  //check user to save on a state current user
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if (user) {
        setFirebaseuser(user)
      } else {
        setFirebaseuser(null)
      }
    });
  }, [])
  
  return ( firebaseuser !== false && (
      <Router>
        <div className="container">
          <NavBar firebaseuser={firebaseuser}/> {/*Send firebase user by props*/}
          <Switch>
            <Route path='/login'><Login/></Route>
            <Route path="/reset"><Reset/></Route>
            <Route path="/notes"><Notes/></Route>
            <Route path="/" exact><Notes/></Route>
          </Switch>
        </div>
      </Router>   
  ));
}

export default App;
