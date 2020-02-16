import React from 'react';
import Moment from 'react-moment';
import './job.css';

import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateJob } from '../../actions/jobActions';

import Type from '../type/Type.js';
import ProgressBar from '../progressBar/ProgressBar.js';
import WeekNumbers from './WeekNumbers.js';
import useModal from '../modalPanel/useModal.js';
import ModalPanel from '../modalPanel/ModalPanel.js';
import JobProjectForm from '../forms/JobProjectForm.js';
// Icons
import CurvedArrow from '../icons/CurvedArrow.js';
import DeadlineFlag from '../icons/DeadlineFlag.js';


function Job(props) {

    const { isOpen, toggle } = useModal();
    const dispatch = useDispatch();
    const { url } = useRouteMatch();

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
        <div className="col-4">
            <div className={"job-card " + (props.data.isInProgress ? "job-card-inProgress" : null)}>
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
                        <button className="inProgress-button"
                            onClick={setToActive}
                        >
                            {props.data.isInProgress ? '◼' : '▶️'}
                        </button>
                        <button className="more-button" onClick={toggle}>•••</button>
                    </div>
                </div>
                <h1>{props.data.name}</h1>
                <h2 className="d-flex flex-row job-project">
                    <CurvedArrow />
                    <Link to={url + '/' + props.data.projectId._id}>
                        <span style={{ marginLeft: "5px" }}>{props.data.projectId ? " " + props.data.projectId.name : <i>Pas de projet</i>}</span>
                    </Link>
                </h2>
                <p className="job-description">                                           {props.data.description}
                </p>
                {props.data.deadline ? <div className="deadline-section">
                    <div className="deadline-icon">
                        <DeadlineFlag />
                    </div>
                    <span><Moment fromNow>{props.data.deadline}</Moment></span>
                </div> : null}
                <ProgressBar progress={props.data.progress}
                    color={props.data.type}
                />
                <button onClick={() => changeStatus("completed")}>
                    DONE
                </button>
            </div>
            <ModalPanel isOpen={isOpen}>
                <JobProjectForm hide={toggle} data={props.data} formType="job" />
            </ModalPanel>
        </div >
    )
};

export default Job;