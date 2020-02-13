import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';

import JobProjectForm from '../forms/JobProjectForm.js';
import ModalPanel from '../modalPanel/ModalPanel.js';
import useModal from '../modalPanel/useModal.js';


const JobsSubheader = () => {

    const { isOpen, toggle } = useModal();

    useEffect(() => {
        // on init, get project infos

    }, [])

    return (
        <div className="jobs-subheader">
            <div className="header">
                <h3>In progress</h3>
            </div>
            <div className='body'>
                In progress...
                </div>
            <div className="footer">
                <div></div>
                <button className="addJob-button" onClick={toggle}>+ NEW JOB</button>
            </div>
            <ModalPanel isOpen={isOpen}>
                <JobProjectForm hide={toggle} formType="job" />
            </ModalPanel>
        </div>
    )
}

export default JobsSubheader;