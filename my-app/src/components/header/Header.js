import React from 'react';
import './header.css';

function Header() {
    return (
        <div className="row app-header">
            <div className="col-3 app-header-left">
                <img alt="Profile" src='https://image.noelshack.com/fichiers/2019/47/2/1574165544-dsc03730nb.jpg'/>
            </div>
            <div className="col-9 app-header-right">
                <p>Au travail !</p>
                <h1>Voici vos tâches de la semaine 48</h1>
            </div>
        </div>
    )
};

export default Header;