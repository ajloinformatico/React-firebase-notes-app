import React, { useEffect, useState } from 'react'
import {withRouter} from 'react-router-dom'
import {auth} from '../firebase'
import NotesCrud from './NotesCrud'

const Notes = (props) => {
    const [user, setUser] = useState(null);
    
    
    useEffect(() => {
        if (auth.currentUser) {
            setUser(auth.currentUser);
        }else{
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
