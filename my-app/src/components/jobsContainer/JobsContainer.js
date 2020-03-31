import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { useLocation, useParams } from 'react-router-dom';
import { getJobs } from '../../actions/jobActions';
import nothingImage from '../../res/fogg-unsubscribed-1.png';

import './jobsContainer.css';
import Job from '../job/Job.js';
import JobsSubheader from './JobsSubheader.js';

const JobsContainer = () => {

    const dispatch = useDispatch();
    const jobs = useSelector(state => state.jobs);
    const [showCompleted, setShowCompleted] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState();

    const location = useLocation()

    useEffect(() => {
        let filters = queryString.parse(location.search);
        console.log(filters)

        // Get project Id from URL  TODO => turn into hooks
        let id = location.pathname;
        id = id.split('/');
        let index = id.indexOf('p');
        id = id[index + 1];
        if (id) {
            filters.projectId = id;
            setSelectedProjectId(id);
        }
        dispatch(getJobs(filters));
    }, [location])

    const renderJobsList = (inProgress, isCompleted) => {
        if (inProgress) {
            return [...jobs].filter(i => i.isInProgress).map((item, i) => {
                return <Job key={i} data={item} />
            })
        } else {
            let _jobsWithNoDeadline = [...jobs].filter(i => !i.isInProgress && !i.deadline);
            let _jobsWithDeadline = [...jobs].filter(i => !i.isInProgress && i.deadline).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
            let _jobs = _jobsWithDeadline.concat(_jobsWithNoDeadline);

            return _jobs.filter(i => i.isInProgress === inProgress && i.isCompleted === isCompleted).map((item, i) => {
                return <Job key={i} data={item} />
            })
        }
    }

    return (
        <>
            <JobsSubheader selectedProjectId={selectedProjectId} />
            {console.log(jobs)}
            <div className='jobsList-section'>
                <h3>En cours ({jobs.filter(i => i.isInProgress).length})</h3>
                <div className="row">
                    {renderJobsList(true, false)}
                </div>
                <h3>A faire ({jobs.filter(i => !i.isCompleted && !i.isInProgress).length})</h3>
                <div className="row">
                    {renderJobsList(false, false)}
                </div>
                <h3 onClick={() => setShowCompleted(!showCompleted)} style={{ cursor: 'pointer' }}>
                    Terminées ({jobs.filter(i => i.isCompleted).length})
                    </h3>
                {
                    showCompleted ?
                        <div className="row">
                            {renderJobsList(false, true)}
                        </div> : null
                }
            </div>
        </>
    )
};

export default JobsContainer;