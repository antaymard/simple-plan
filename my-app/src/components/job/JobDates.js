import React from 'react';
import moment from 'moment';
import './jobDates.css';

function JobDates(props) {
    if (props.date) {
        return (
            <div className={"job-card-date-display" + (moment(props.date).isBefore(new Date()) ? " is-late" : "")}>
                <div className={"date-pill" + (props.type ? ' date-pill-' + props.type : "")} />
                {moment(props.date).format("DD MMMM")}
            </div>
        )
    } else {
        return null
    }
};

export default JobDates;