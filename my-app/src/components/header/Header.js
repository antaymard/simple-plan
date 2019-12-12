import React from 'react';
import { useStore } from 'react-hookstore';
import './header.css';


function Header() {

    const [ logStatus, setLogStatus ] = useStore('logStatusStore');

    const logout = () => {
        localStorage.removeItem('token');
        setLogStatus(false);
    }

    return (
        <div className="row app-header">
            <div className="col-2 app-header-left d-flex flex-row">
                <button onClick={logout}>Deconnexion</button>
                <img alt="Profile" src='https://image.noelshack.com/fichiers/2019/47/2/1574165544-dsc03730nb.jpg'/>
            </div>
            <div className="col-10 app-header-right">
                <p>Au travail !</p>
                <h1>Voici vos tâches en cours</h1>
            </div>
        </div>
    )
};

export default Header;