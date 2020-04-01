import React, { useState, useEffect } from 'react';
import { useStore } from "react-hookstore";
import { toast } from "react-toastify";
import axios from 'axios';

import './login_signup.css';

const Login = () => {

    const [loginData, setLoginData] = useState({ email: '', password: "" });
    const [signData, setSignData] = useState({
        fName: "",
        lName: "",
        email: "",
        password: ""
    });
    const [logStatus, setLogStatus] = useStore('logStatusStore');

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLogStatus(true);
        }
        console.log(logStatus)
    })


    const handleLoginChange = (e) => {
        let obj = loginData;
        obj[e.target.name] = e.target.value;
        setLoginData({ ...loginData, ...obj });
    }


    const login = () => {
        if (!Object.values(loginData).some(x => (x === null || x === ''))) {
            axios.post('/authenticate', loginData)
                .then(res => {
                    console.log(res.data);
                    if (res.data.success) {
                        localStorage.setItem('token', res.data.token);
                        setLogStatus(true);
                        toast("Connexion réussie",
                            { type: toast.TYPE.SUCCESS }
                        )
                        // redirect
                        window.location.href = "/dashboard";
                    } else {
                        toast(res.data.message,
                            { type: toast.TYPE.ERROR }
                        )
                    }
                })
        } else {
            toast('Veuillez remplir tous les champs pour vous connecter',
                { type: toast.TYPE.WARNING }
            )
        }
    }

    return (
        <div className="sign-body row">
            <div className='left-section col-4'>
                <p>FOCUS</p>
                <div>
                    <h1>Reprenons où nous en étions.</h1>
                    <p>Voir les dernières nouveautés de Focus.</p>
                </div>
                <div>← Retour</div>
            </div>
            <div className='right-section col-8'>
                <div className="sign-form-section">
                    <div className="sign-input-group">
                        <p className='sign-input-label'>Email</p>
                        <input type="email" placeholder="Email" name="email" onChange={handleLoginChange} />
                    </div>
                    <div className="sign-input-group">
                        <p className='sign-input-label'>Mot de passe</p>
                        <input type="password" placeholder="*****" name="password" onChange={handleLoginChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    login();
                                }
                            }} />
                    </div>
                    <div className="sign-form-footer">
                        <a href='/signup'>Créer un compte</a>
                        <button onClick={login}>Se connecter</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login;