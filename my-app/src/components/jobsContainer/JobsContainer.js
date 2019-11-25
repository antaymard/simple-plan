import React, { useState, useEffect} from 'react';
import { useStore } from 'react-hookstore';

import './jobsContainer.css';

import Job from '../job/Job.js';
import useModal from '../modalPanel/useModal.js';
import JobProjectForm from '../forms/JobProjectForm.js';
import ModalPanel from '../modalPanel/ModalPanel.js';
import useGetJobs from '../hooks/useGetJobs.js';

const JobsContainer = () => {

    const { isOpen, toggle } = useModal();
    const { _jobsList, getJobs } = useGetJobs();
    const [ jobsList, setJobsList ] = useStore('jobsListStore');
    const [ filter, setFilter ] = useStore('jobFilterStore');

    useEffect(() => {
        getJobs();
    }, [ filter ])

    const renderJobsList = () => {
        return jobsList.map(function(item, i){
            return <Job key={i} data={jobsList[i]}/>
        })
    }

    const editFilter = ( e ) => {
        let _filter = {};
        setFilter( _filter );
    }

    return (
        <>
            <div className="subHeader">
                <div className="subHeader-filters">
                    <a href='#' onClick={editFilter}>ALL</a>
                    <a href='/'>THIS WEEK</a>
                    <a href='/'>SKIPPED</a>
                </div>
                <button className="addJob-button" onClick={toggle}>ADD JOB</button>
            </div>
            <div className='row jobsList-section'>
                {renderJobsList()}
            </div>
            <ModalPanel isOpen={isOpen}>
                <JobProjectForm hide={toggle} formType="job"/>
            </ModalPanel>
        </>
    )
};

export default JobsContainer;