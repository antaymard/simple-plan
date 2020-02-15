import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '../../actions/jobActions';
import queryString from 'query-string';

import './jobsContainer.css';

import Job from '../job/Job.js';
import JobsSubheader from './JobsSubheader.js';

const JobsContainer = () => {

    const dispatch = useDispatch();
    const jobs = useSelector(state => state.jobs);
    const [showCompleted, setShowCompleted] = useState(false);

    useEffect(() => {
        let filters = queryString.parse(window.location.search);
        dispatch(getJobs(filters));
    }, [window.location.search])

    const renderJobsList = (option) => {
        if (option === "inProgress") {
            return jobs.map((item, i) => {
                if (item.isInProgress) {
                    return <Job key={i} data={item} />
                }
            })
        } else {
            return jobs.map((item, i) => {
                if (item.isInProgress === false && item.status === option) {
                    return <Job key={i} data={item} />
                }
            })
        }
    }

    return (
        <>
            <div className="subHeader">
                <JobsSubheader />
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
                <h3 onClick={() => setShowCompleted(!showCompleted)} style={{ cursor: 'pointer' }}>
                    Terminées ({jobs.filter(i => i.status === "completed").length - 1})
                </h3>
                {
                    showCompleted ?
                        <div className="row">
                            {renderJobsList("completed")}
                        </div> : null
                }
            </div>
        </>
    )
};

export default JobsContainer;