import React, { useState, useEffect } from 'react';
import { useStore } from 'react-hookstore';
import axios from 'axios';

import "./projectsContainer.css";

import Project from '../project/Project.js';
import ModalPanel from '../modalPanel/ModalPanel.js';
import useModal from '../modalPanel/useModal.js';
import JobProjectForm from '../forms/JobProjectForm.js';
import useGetJobs from '../hooks/useGetJobs.js';


const ProjectsContainer = () => {

    const { isOpen, toggle } = useModal();
    const [ projectsList, setProjectsList ] = useState([]);
    const {jobsList, getJobs} = useGetJobs();
    const [ filter, setFilter ] = useStore('jobFilterStore');


    const renderProjectsList = () => {
        return projectsList.map(function(item, i){
            return (
                <Project key={i} data={projectsList[i]}/>
            )
        })
    }

    useEffect(() => {
        axios.get('/api/projects')
        .then(res => {
            setProjectsList(res.data);
        })
    }, []) // Comp did mount

    useEffect(() => {
        getJobs();
    }, [ filter ])


    return (
        <>
            <div className="project-container-header">
                <h1>PROJETS</h1>            
                <button className="addProject-button" onClick={toggle}>+</button>
            </div>
            <div className="projectsList-section">
                {renderProjectsList()}
            </div>
            <ModalPanel isOpen = {isOpen}>
                <JobProjectForm hide={toggle} formType="project"/>
            </ModalPanel>
        </>
    )

}

export default ProjectsContainer;