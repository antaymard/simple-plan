import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
// import { useStore } from 'react-hookstore';
// import { Link } from 'react-router-dom';


function NowProject() {

    const [display, setDisplay] = useState(false);
    const jobs = useSelector(state => state.jobs);

    useEffect(() => {
        // GET IsNow job

    }, [])

    const displayPopup = () => {
        if (display) {
            return (
                <div className="workingPopup" onMouseLeave={() => setDisplay(false)}>
                    {jobs.length}
                </div>
            )
        }
    }

    return (
        <div className="workingSection">

            <button className='workingButton'
                onMouseEnter={() => setDisplay(true)}

            >{jobs.filter(i => i.isNow === true).length}</button>
            {displayPopup()}
        </div>
    )
};

export default NowProject;