import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import queryString from "query-string";
import CurvedArrow from '../icons/CurvedArrow.js';
// import { useStore } from 'react-hookstore';
import { Link } from 'react-router-dom';
import Switch from '../icons/Switch';
import ProgressBar from '../progressBar/ProgressBar.js';


function NowProject() {

    const [display, setDisplay] = useState(false);
    const [nowJob, setNowJob] = useState({
        projectId: {}
    });
    // const [ displayType, setDisplayType ] = useState(0)

    useEffect(() => {
        getIsNow();
    }, [])

    const displayPopup = () => {
        if (display) {
            if (nowJob) {
                return (
                    <div className="workingPopup" onMouseLeave={() => setDisplay(false)}>
                        <div className="workingPopup-header">
                            <div className="d-flex flex-column">
                                <h1>{nowJob.name}</h1>
                                <h2 className="d=flex flex-row"><CurvedArrow /><Link to={'/?projectId=' + nowJob.projectId._id}>
                                    <span style={{ marginLeft: "5px" }}>{nowJob.projectId ? " " + nowJob.projectId.name : <i>Pas de projet</i>}</span>
                                </Link></h2>
                            </div>
                        </div>
                        <p>{nowJob.description}</p>
                        <ProgressBar
                            progress={30}
                            color="learn"
                        />
                    </div>
                )
            }
        }
    }

    // const renderContent = () => {
    //     return 
    // }

    const getIsNow = () => {
        axios.get('/api/jobs?' + queryString.stringify({ isNow: true }), {
            headers: { "x-access-token": localStorage.getItem('token') }
        })
            .then(res => {
                console.log(res.data)
                setNowJob(res.data[0]);
            })
            .catch(err => { throw err })
    }

    return (
        <div className="workingSection">
            <button className='workingButton'
                onMouseEnter={() => setDisplay(true)}
            >LOL</button>
            {displayPopup()}
        </div>
    )
};

export default NowProject;