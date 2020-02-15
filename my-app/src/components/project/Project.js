import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch, useParams } from 'react-router-dom';
import './project.css';

import useModal from '../modalPanel/useModal.js';
import ModalPanel from '../modalPanel/ModalPanel.js';
import JobProjectForm from '../forms/JobProjectForm.js';
import queryString from 'query-string';

function Project(props) {

    const id = useRouteMatch();

    const { isOpen, toggle } = useModal();
    const [selectedProject, setSelectedProject] = useState('');
    const { url } = useRouteMatch();

    // TO REVIEW
    useEffect(() => {
        //console.log(queryString.parse())
        setSelectedProject(queryString.parse(window.location.search).projectId);
    });

    return (
        <>
            <Link to={url + '/p?projectId=' + props.data._id}>
                <div
                    className={"project-card " + (props.data._id === selectedProject ? "project-card-selected" : null)}
                    onClick={() => setSelectedProject(props.data_id)}
                >
                    <img src={props.data.coverImage} onClick={toggle}></img>
                    <p>
                        {props.data.name}
                    </p>
                </div>
            </Link>
            <ModalPanel isOpen={isOpen}>
                <JobProjectForm hide={toggle} data={props.data} formType="project" />
            </ModalPanel>
        </>
    )
};

export default Project;