import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch, useParams, useLocation } from 'react-router-dom';
import './project.css';

import useModal from '../modalPanel/useModal.js';
import ModalPanel from '../modalPanel/ModalPanel.js';
import JobProjectForm from '../forms/JobProjectForm.js';
import queryString from 'query-string';

function Project(props) {

    const { id } = useParams();
    const [selectedProjectId, setSelectedProjectId] = useState();

    const { isOpen, toggle } = useModal();
    let location = useLocation();


    // PASSER EN HOOK
    useEffect(() => {
        let selected = location.pathname;
        selected = selected.split('/');
        let index = selected.indexOf('p');
        selected = selected[index + 1];
        setSelectedProjectId(selected);
    }, [location]);

    return (
        <>
            <Link to={'/dashboard/p/' + props.data._id}>
                <div
                    className={"project-card " + (props.data._id === selectedProjectId ? "project-card-selected" : null)}
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