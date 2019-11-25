import React from 'react';
import { useStore } from 'react-hookstore';
import './project.css';

import useModal from '../modalPanel/useModal.js';
import ModalPanel from '../modalPanel/ModalPanel.js';
import JobProjectForm from '../forms/JobProjectForm.js';

function Project(props) {

    const { isOpen, toggle } = useModal();
    const [ filter, setFilter ] = useStore('jobFilterStore');


    const addProjectToFilter = ( projectId ) => {
        console.log("filter has changed");
        let _filter = filter;
        _filter = { projectId : projectId };
        setFilter( _filter );
    }


    return (
        <>
            <div 
            className={"project-card " + (filter.projectId == props.data._id ? "project-card-selected" : null)}
            onClick={() => addProjectToFilter(props.data._id)}
            style={{ backgroundImage : "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 10.08%, rgba(0, 0, 0, 0.075) 50.67%, rgba(0, 0, 0, 0.5) 100%), url(" + props.data.coverImage + ")" }}
            >
                <div className='d-flex flex-row justify-content-between'>
                {props.data.name}
                <button className="more-button" onClick={toggle}>•••</button>
                </div>
            </div>
            <ModalPanel isOpen={isOpen}>
                <JobProjectForm hide={toggle} data={props.data} formType="project"/>
            </ModalPanel>
        </>
    )
};

export default Project;