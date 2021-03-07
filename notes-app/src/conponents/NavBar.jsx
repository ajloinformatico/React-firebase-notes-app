import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Login from './Login'
import NotesCrud from './NotesCrud'

const NavBar = () => {
    
    
    const login = true
   
    return (
        <div className="navbar navbar-dark bg-dark mt-5">
            <Link to='/' className="navbar-brand mx-3">
                <img class="logo"src='infolojo.png'></img>
            </Link>
            {/*left content*/}
            <div className="d-flex">
            </div>


        </div>
        





    )
}

export default NavBar;
