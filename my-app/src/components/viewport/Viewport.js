import React from 'react';
import './viewport.css';

import ProjectsContainer from '../projectsContainer/ProjectsContainer.js';
import JobsContainer from '../jobsContainer/JobsContainer.js'

function Viewport() {
    return (
        <div className="row viewport">
            <div className="col-2 viewport-left fullHeight">
                <ProjectsContainer/>
            </div>
            <div className="col-10 viewport-right fullHeight">
                <JobsContainer/>
            </div>
        </div>
    )
}

export default Viewport;