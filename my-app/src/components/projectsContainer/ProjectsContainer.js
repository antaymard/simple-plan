import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../actions/projectActions';

import "./projectsContainer.css";

import Project from '../project/Project.js';
import ModalPanel from '../modalPanel/ModalPanel.js';
import useModal from '../modalPanel/useModal.js';
import JobProjectForm from '../forms/JobProjectForm.js';


const ProjectsContainer = (props) => {

    const { isOpen, toggle } = useModal();

    // REDUX
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects)

    useEffect(() => {
        dispatch(getProjects());
    }, [])

    const renderProjectsList = () => {
        return projects.map(function (item, i) {
            return (
                <Project key={i} data={item} />
            )
        })
    }

    return (
        <>
            <div className="project-container-header">
                <div className="project-container-header-section">
                    <h1>PROJETS ({projects.length})</h1>
                </div>
                <div className="project-container-header-section">
                    <p>Filters</p>
                    <button className="addProject-button" onClick={toggle}>+  PROJET</button>
                </div>
            </div>
            <div className="projectsList-section">
                {renderProjectsList()}
            </div>
            <ModalPanel isOpen={isOpen}>
                <JobProjectForm hide={toggle} formType="project" />
            </ModalPanel>
        </>
    )

}

export default ProjectsContainer;