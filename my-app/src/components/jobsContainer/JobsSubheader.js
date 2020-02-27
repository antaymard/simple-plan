import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from "moment";

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
                            <WeekNumbers weeknb={[moment(p.deadline).format('W')]} />
                            <p>Deadline : le {moment(p.deadline).format("DD-MM-YYYY")}</p>
                        </div>
                    </div>
                </div>
                <div className="jobs-subheader-right-section">
                    <Link
                        key={p.name}
                        to={{
                            pathname: "/dashboard/j/new",
                            state: { background: location, projectId: props.selectedProjectId }
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