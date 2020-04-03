import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from "moment";
import { ObjectId } from 'bson';


import WeekNumbers from '../job/WeekNumbers.js';

import './jobsSubheader.css';

const JobsSubheader = (props) => {

    let location = useLocation();
    const projects = useSelector(state => state.projects);

    const renderProjectData = () => {
        let p = projects.filter(i => i._id === props.selectedProjectId)[0] || {};
        console.log(p)
        return (
            <>
                <div className="jobs-subheader-left-section">
                    <img src={p.coverImage} />
                    <div className="jobs-subheader-info-section">
                        <h3>{p.name}</h3>
                        <div className='d-flex flex-row align-items-center'>
                            {p.deadline ?
                                <>
                                    <WeekNumbers weeknb={[moment(p.deadline).format('W')]} />
                                    <p>Deadline : le {moment(p.deadline).format("DD-MM-YYYY")}</p>
                                </>
                                : null
                            }
                        </div>
                    </div>
                </div>
                <div className="jobs-subheader-right-section">
                    <Link
                        key={p.name}
                        to={{
                            pathname: "/dashboard/j/" + new ObjectId().toString(),
                            state: { background: location, projectId: props.selectedProjectId, isJobCreation: true }
                        }}>
                        + new job
                    </Link>
                </div>
            </>
        )
    }

    if (props.selectedProjectId) {
        return (
            <div className="jobs-subheader-container">
                {renderProjectData()}
            </div>
        )
    } else {
        return null
    }
}

export default JobsSubheader;