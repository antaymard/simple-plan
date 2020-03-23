import React, { useState } from 'react';
import './job.css';

import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateJob } from '../../actions/jobActions';

import Type from '../type/Type.js';
import ProgressBar from '../progressBar/ProgressBar.js';
import WeekNumbers from './WeekNumbers.js';
import JobDates from './JobDates.js';
// Icons
import CurvedArrow from '../icons/CurvedArrow.js';
import PlayIcon from '../icons/PlayIcon.js';
import StraightArrow from '../icons/StraightArrow.js';
import DoneIcon from '../icons/DoneIcon.js';


function Job(props) {

    const dispatch = useDispatch();
    const { url } = useRouteMatch();

    let location = useLocation();

    const [isPanelOpen, setIsPanelOpen] = useState(false);

    // TO MERGE AND ONLY UPDATE ONE PROP

    const setToActive = () => {
        let d = props.data;
        if (d.status !== "active") {
            d.status = 'active'
        }
        d.isInProgress = !d.isInProgress;
        dispatch(updateJob(d));
    }

    const changeStatus = (status) => {
        let d = props.data;
        // if completed, turn active
        if (props.data.status === "completed") {
            d.status = 'active'
        }
        // if active, turn completed
        else {
            // if was in progress, remove it
            if (d.isInProgress) {
                d.isInProgress = false;
            }
            d.progress = 100;
            d.status = "completed"
        }
        console.log(d)
        dispatch(updateJob(d));
    }

    return (
        <div className="col-4" style={isPanelOpen ? { zIndex: "1" } : {}}>
            <div className={"job-card " + (props.data.isInProgress ? "job-card-inProgress" : "")} onBlur={() => setIsPanelOpen(false)}
            >
                <div style={{ width: '100%' }}>
                    <div className="job-header">
                        <div className='d-flex flex-row'>
                            <Type
                                type={props.data.type}
                                selected="selected"
                            />
                            <div className="weekNumberSection">
                                <WeekNumbers weeknb={props.data.weekNumber} />
                            </div>
                        </div>
                        <div>
                            <button className="more-button" onClick={() => setIsPanelOpen(!isPanelOpen)}>•••</button>
                        </div>
                    </div>
                    <div className="job-content">
                        <Link
                            key={props.data.name}
                            to={{
                                pathname: "/dashboard/j/" + props.data._id,
                                state: { background: location }
                            }}>
                            <h1>{props.data.name}</h1>
                        </Link>
                        <h2 className="d-flex flex-row job-project">
                            <CurvedArrow />
                            <Link to={url + props.data.projectId._id}>
                                <span style={{ marginLeft: "5px" }}>{props.data.projectId ? " " + props.data.projectId.name : <i>Pas de projet</i>}</span>
                            </Link>
                        </h2>
                        <div className="job-description-container">
                            <p className="job-description">
                                {props.data.description ? props.data.description : "Pas de description"}
                            </p>
                        </div>
                        <div className="job-dates-container">
                            <JobDates date={props.data.deadline} type="deadline" />
                        </div>
                    </div>
                </div>
                <ProgressBar progress={props.data.progress}
                    color={props.data.type}
                />

                <div className="job-side-panel"
                    style={isPanelOpen ? { right: "-50px" } : { boxShadow: 'none' }}
                >
                    <div>
                        <button className='job-panel-button' onClick={setToActive}>
                            {props.data.isInProgress ? '◼' : <PlayIcon />}
                        </button>
                        <button className='job-panel-button'>
                            <StraightArrow />
                        </button>
                    </div>
                    <div>
                        <button className='job-panel-button' onClick={() => changeStatus("completed")}>
                            <DoneIcon />
                        </button>
                    </div>
                </div>

            </div>
        </div >
    )
};

export default Job;