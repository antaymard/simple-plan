import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';

import { addBlankJob } from '../../actions/jobActions';

import JobProjectForm from '../forms/JobProjectForm.js';
import ModalPanel from '../modalPanel/ModalPanel.js';
import useModal from '../modalPanel/useModal.js';


const JobsSubheader = () => {

    const { isOpen, toggle } = useModal();
    const { search } = useLocation();
    const jobs = useSelector(state => state.jobs)
    const dispatch = useDispatch();

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
                {/* <Link to='/dashboard/j' className="addJob-button">OMG</Link> */}
            </div>
            <ModalPanel isOpen={isOpen}>
                <JobProjectForm hide={toggle} formType="job" />
            </ModalPanel>
        </div>
    )
}

export default JobsSubheader;