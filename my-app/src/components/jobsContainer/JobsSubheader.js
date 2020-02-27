import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './jobsSubheader.css';

const JobsSubheader = () => {

    let location = useLocation();
    const projects = useSelector(state => state.projects);
    const [selectedProject, setSelectedProject] = useState('');


    useEffect(() => {
        // Get project Id from URL  TODO => turn into hooks
        let id = location.pathname;
        id = id.split('/');
        let index = id.indexOf('p');
        id = id[index + 1];
        console.log(projects)
        console.log(id);
        // setSelectedProject(projects.filter(i => i._id === id))

    }, [location])


    return (

        <div className="jobs-subheader-container">
            {selectedProject}
        </div>
    )
}

export default JobsSubheader;