import React from 'react';
import { useStore } from 'react-hookstore';
import { Link } from 'react-router-dom';
import './sidebar.css';
import NowProject from './NowProject'


function Sidebar() {

    const [logStatus, setLogStatus] = useStore('logStatusStore');

    const logout = () => {
        localStorage.removeItem('token');
        setLogStatus(false);
    }

    return (
        <div className="app-sidebar">
            <NowProject />
            <div className='link-section'>

            </div>
            <Link to='/dashboard'>Ho</Link>
            <Link to='/my-projects'>Pro</Link>
            {/* <button onClick={logout}>DEC</button> */}
            <img alt="Profile" src='https://image.noelshack.com/fichiers/2019/47/2/1574165544-dsc03730nb.jpg' />
        </div>
    )
};

export default Sidebar;