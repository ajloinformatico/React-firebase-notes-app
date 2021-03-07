import React, { useState } from 'react'
import {db, auth} from '../firebase'
import {withRouter} from 'react-router-dom'

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState(null);
    const [isRegister, setIsRegister] = useState(false);


    /**
     * check data form
     * @param {event} e: onSubmit 
     */
    const dataProces = e =>{
        e.preventDefault() //dont send nothing
        
        //Check data form
        if(!email.trim()){
            setError("Email is empty")
            return
        }
        if(!pass.trim()){
            setError("Password is empty")
            return
        }
        if(pass.length<6){
            setError("Password is too small")
        }
        //check isRegister state to signIn or logIng
        isRegister?signIn():login();
    }

    /**
     * Sign in function
     */
    const signIn = async () => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass) //states values
            //add new user
            await db.collection('users').doc(email).set({
                email:res.user.email,
                uid:res.user.uid
            })
            setEmail("");
            setPass("");
            setError(null);
            //props.history.push('/notes') //on notes check user to redirect login or show crud
        }catch(error){
            //console.log(error)
            if(error.code==="auth/invalid-email"){
                setError("Invalid email");
            }

            
            if(error.code==="auth/email-already-in-use"){
                setError("There is already a registered user with that email");
            }
        }
    }

    /**
     * login function
     */
    const login = async () => {
        try {
            await auth.signInWithEmailAndPassword(email, pass)
            setEmail("");
            setPass("");
            setError(null);
            //props.history.push('/admin') //on notes check user to redirect login or show crud
        }catch(error){
            if(error.code==="auth/user-not-found"||error.code==="auth/wrong-password"){
                setError("Email or password or bouth are incorrect");
            }
        }
    }



    return (
        <div className="mt5">
            {/*if user isnt authenticated load sign in*/}
            <h3 className="text-center">{isRegister?"Sign in":"login"}</h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={dataProces}>
                        {
                            //Show errors on form by error state
                            error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )
                        }
                        <input type="email" name="email" id="email" value={email}
                            placeholder="Your email"
                            onChange={e => setEmail(e.target.value)} 
                            className="form-control mb-2"
                        />
                        <input type="password" name="pass" id="pass" value={pass}
                            placeholder="Your password"
                            onChange={e => setPass(e.target.value)}
                            className="form-control mb-2"
                        />
                        {/*button is the same for bouth because i check user and pass on
                        dataProces function*/}
                        <button className="btn btn-lg btn-dark w-100 mb-2" type="submit">
                            {/*show button text in function of user is register*/}
                            {isRegister?"Sign in":"Login"}
                        </button>
                        {/*button to change between register and login*/}
                        <button className="btn btn-sm btn-info w-100  mb-2" type="button"
                            onClick={()=>setIsRegister(!isRegister)} //reversing the value of the state
                        >
                            {isRegister? "Do you already have an account?":"Don't have an account yet?"} 
                        </button>
                        {/*if is register is false or if state is on login show button for recover password*/}
                        <button className="btn btn-danger btm-sm" type="button"
                            onClick={()=>props.history.push('/reset')}
                        >
                            Recover password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
