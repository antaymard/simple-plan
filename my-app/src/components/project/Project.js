import React from 'react';
import { useStore } from 'react-hookstore';
import './project.css';

import useModal from '../modalPanel/useModal.js';
import ModalPanel from '../modalPanel/ModalPanel.js';
import JobProjectForm from '../forms/JobProjectForm.js';

function Project(props) {

    const { isOpen, toggle } = useModal();
    const [filter, setFilter] = useStore('jobFilterStore');


    const addProjectToFilter = (projectId) => {
        console.log("filter has changed");
        let _filter = filter;
        _filter = { projectId: projectId };
        setFilter(_filter);
    }

    return (
        <>
            <div
                className={"project-card " + (filter.projectId == props.data._id ? "project-card-selected" : null)}
                onClick={() => addProjectToFilter(props.data._id)}
            >
                <img src={props.data.coverImage} onClick={toggle}></img>
                <p>
                    {props.data.name}
                </p>
            </div>
            <ModalPanel isOpen={isOpen}>
                <JobProjectForm hide={toggle} data={props.data} formType="project" />
            </ModalPanel>
        </>
    )
};

export default Project;