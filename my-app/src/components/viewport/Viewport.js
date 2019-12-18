import React from 'react';
import Calendar from 'react-calendar';
import './viewport.css';

import ProjectsContainer from '../projectsContainer/ProjectsContainer.js';
import JobsContainer from '../jobsContainer/JobsContainer.js'

function Viewport() {

    return (
        <div className="row viewport">
            <div className="col-2 viewport-left fullHeight">
                <Calendar 
                    value={new Date()}
                    formatShortWeekday={(locale, value) => ['D', 'L', 'M', 'M', 'J', 'V', 'S'][value.getDay()]}
                    formatMonth={(local, value) => ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'][value.getMonth()]}
                    next2Label={null}
                    prev2Label={null}
                    showWeekNumbers
                />
                <ProjectsContainer/>
            </div>
            <div className="col-10 viewport-right fullHeight">
                <JobsContainer/>
            </div>
        </div>
    )
}

export default Viewport;