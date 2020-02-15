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

    const { id } = useParams();
    const location = useLocation()

    useEffect(() => {
        let filters = queryString.parse(location.search)
        if (id) {
            console.log("id is provided");
        }
        dispatch(getJobs(filters));
        console.log(jobs.length)
    }, [location])

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

    if (jobs.length > 0) {
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
                        Terminées ({jobs.filter(i => i.status === "completed").length})
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
    } else {
        return (
            <>
                <img src={nothingImage} style={{
                    borderRadius: "50%",
                    height: "auto",
                    objectFit: "cover",
                }} />
            </>
        )
    }
};

export default JobsContainer;