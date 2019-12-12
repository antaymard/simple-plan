import React, { useState } from 'react';
import { useStore } from "react-hookstore";
import axios from 'axios';

import './login.css';

const Login = () => {

    const [ loginData, setLoginData ] = useState({ email : '', password : ""}); 
    const [ signData, setSignData ] = useState({
        fName : "",
        lName : "",
        email : "",
        password : ""
    });   
    const [ logStatus, setLogStatus ] = useStore('logStatusStore');

    const handleLoginChange = (e) => {
        let obj = loginData;
        obj[e.target.name] = e.target.value;
        setLoginData({ ...loginData, ...obj });
    }

    const handleSignChange = (e) => {
        let obj = signData;
        obj[e.target.name] = e.target.value;
        setSignData({ ...signData, ...obj });
    }

    const login = () => {
            if(!Object.values(loginData).some(x => (x === null || x === ''))) {
            axios.post('/authenticate', loginData)
            .then( res => {
                console.log(res.data);
                if (res.data.success) {
                    localStorage.setItem('token', res.data.token);
                    setLogStatus(true);    
                } else {
                    // HANDLE ERROR
                }
            })
        }
    }

    const sign = () => {
        if(!Object.values(signData).some(x => (x === null || x === ''))) {
            axios.post('/signup', signData)
            .then( res => {
                console.log(res.data);
            })
        }
    }


    return (
        <div className="loginDiv">
            { console.log(loginData)}
            <h1>Gérez vos projets simplement</h1>
            <div className='row'>
                <div className='col d-flex flex-column'>
                    <h2>Connectez-vous</h2>
                    <input type='text' placeholder="email" name="email" onChange={handleLoginChange}></input>
                    <input type='password' placeholder="*****" name="password" onChange={handleLoginChange}></input>
                    <button onClick={login}>Valider</button>
                    <a href="#">Mot de passe oublié</a>
                </div>
                <div className='col d-flex flex-column'>
                    <h2>Ou inscrivez-vous</h2>
                    <input type='text' placeholder="Prénom" name="fName" onChange={handleSignChange}></input>
                    <input type='text' placeholder="Nom" name="lName" onChange={handleSignChange}></input>
                    <input type='text' placeholder="Email" name="email" onChange={handleSignChange}></input>
                    <input type='password' placeholder="*****" name="password" onChange={handleSignChange}></input>
                    <button onClick={sign}>Valider</button>
                </div>
            </div>
        </div>
    )

}

export default Login;