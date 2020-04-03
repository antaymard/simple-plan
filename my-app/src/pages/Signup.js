import React, { useState } from 'react';
import { useStore } from "react-hookstore";
import { toast } from "react-toastify";
import axios from 'axios';

import './login_signup.css';

const Signup = () => {

    const [loginData, setLoginData] = useState({ email: '', password: "" });
    const [signData, setSignData] = useState({});

    const handleSignChange = (e) => {
        // let obj = signData;
        // obj[e.target.name] = e.target.value;
        setSignData({ ...signData, [e.target.name]: e.target.value });
    }

    const sign = () => {
        if (!Object.values(signData).some(x => (x === null || x === ''))) {
            axios.post('/signup', signData)
                .then(res => {
                    console.log(res.data)
                    if (res.data.success) {
                        toast(res.data.message, { type: toast.TYPE.SUCCESS })
                    }
                })
        } else {
            toast('Veuillez remplir tous les champs pour créer un compte',
                { type: toast.TYPE.WARNING }
            )
        }
    }

    return (
        <div className="sign-body row">
            {console.log(signData)}
            <div className='left-section col-4'>
                <p>FOCUS</p>
                <div>
                    <h1>Vous êtes à quelques clics d'une meilleure gestion de votre attention.</h1>
                    <p>A l’occasion de son lancement, Focus est gratuit à vie pour les premiers utilisateurs.</p>
                    <p>Créez votre compte, confirmez votre email et commencez.</p>
                </div>
                <div>← Retour</div>
            </div>
            <div className='right-section col-8'>
                <div className="sign-form-section">
                    <div className="sign-input-group">
                        <p className='sign-input-label'>Vous utiliserez Focus pour</p>
                        <div className="d-flex flex-row">
                            <button>Le travail</button>
                            <button className="selected">Des projects persos</button>
                        </div>
                    </div>
                    <div className="sign-input-group">
                        <p className='sign-input-label'>Email</p>
                        <input type="email" placeholder="Email" name="email" onChange={handleSignChange} />
                    </div>
                    <div className="sign-input-group">
                        <p className='sign-input-label'>Mot de passe</p>
                        <input type="password" placeholder="*****" name="password" onChange={handleSignChange} />
                    </div>
                    <div className="sign-form-footer">
                        <a href='/login'>J'ai déjà un compte</a>
                        <button onClick={sign}>Créer un compte</button>
                    </div>
                </div>
            </div>
        </div >
    )

}

export default Signup;