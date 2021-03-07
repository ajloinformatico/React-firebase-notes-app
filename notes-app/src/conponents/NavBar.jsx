import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { auth } from '../firebase'

//props with user auth
const NavBar = (props) => {
    
    /**
     * close an user session and open / where i check if there is an user loging
     */
    const logOut = () => {
        auth.signOut()
        .then(()=>{
            props.history.push('/login')
        })
        
    }
   
    return (
        <div className="navbar navbar-dark bg-dark mt-5">
            <Link to='/' className="navbar-brand mx-3">
                <img alt="app/img" className="logo"src='infolojo.png'></img>
            </Link>
            {/*left content*/}
            <div className="d-flex">
                {
                    props.firebaseuser !== null ? (
                        <NavLink className="btn btn-dark mr-2" to="/notes">
                            Notes
                        </NavLink>
                    ):null    
                }
                {
                    props.firebaseuser !== null ? (
                        <button className="btn btn-dark"onClick={()=>logOut()}>
                            Log out
                        </button>
                    ):(
                        <NavLink className="btn btn-dark mr-8" to="/login">
                            Login
                        </NavLink>
                    )
                }
            
            
            </div>


        </div>
        





    )
}

export default withRouter(NavBar);
