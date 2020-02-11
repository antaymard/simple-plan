import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '../../actions/jobActions';
import queryString from 'query-string';

import './jobsContainer.css';

import Job from '../job/Job.js';
import JobsSubheader from './JobsSubheader.js';

const JobsContainer = () => {

    const dispatch = useDispatch();
    const jobs = useSelector(state => state.jobs);

    useEffect(() => {
        console.log("USEEFFECT CALLED")
        let selectedProject = queryString.parse(window.location.search);
        dispatch(getJobs(selectedProject));
    }, [window.location.search])

    const renderJobsList = (option) => {
        console.log('renderJobsList');
        let _jobs = jobs;
        if (option === "inProgress") {
            return _jobs.filter(i => i.isInProgress === true).map(function (item, i) {
                return <Job key={i} data={item} />
            })
        } else {
            return _jobs.map(function (item, i) {
                if (item.isInProgress === false && item.status === option) {
                    return <Job key={i} data={item} />
                }
            })
        }
    }

    return (
        <>
            {console.log(jobs)}
            <div className="subHeader">
                {/* <JobsSubheader /> */}
            </div>
            <div className='jobsList-section'>
                <h3>En cours</h3>
                <div className="row">
                    {jobs.map(function (item, i) {
                        if (item.isInProgress) {
                            return <Job key={i} data={item} />
                        }
                    })}
                </div>
                <h3>A faire</h3>
                <div className="row">
                    {renderJobsList("active")}
                </div>
                <h3>Terminées</h3>
                <div className="row">
                    {renderJobsList("completed")}
                </div>
            </div>
        </>
    )
};

export default JobsContainer;