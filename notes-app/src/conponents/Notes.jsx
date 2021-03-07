import React, { useEffect, useState } from 'react'
import {withRouter} from 'react-router-dom'
import {auth} from '../firebase'
import NotesCrud from './NotesCrud'

const Notes = (props) => {
    const [user, setUser] = useState(null);
    const [notes, setNotes] = useState([]);
    const [note, setNote] =  useState("");
    const [error, setError] = useState(null);
    
    
    useEffect(() => {
        console.log("entro")
        if (auth.currentUser) {
            console.log("hay usuario");
            setUser(auth.currentUser);
        }else{
            console.log("no hay usuario");
            props.history.push('/login');
        }
    },  [props])
  

    //HOME route if user is register show notes if not login
    return (
        <div>
            {
                user && (<NotesCrud user={user.email}/>)
            }
            
            
        </div>
    )
}

export default withRouter(Notes);
