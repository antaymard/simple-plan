import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../actions';

import "./projectsContainer.css";

import Project from '../project/Project.js';
import ModalPanel from '../modalPanel/ModalPanel.js';
import useModal from '../modalPanel/useModal.js';
import JobProjectForm from '../forms/JobProjectForm.js';


const ProjectsContainer = () => {

    const { isOpen, toggle } = useModal();

    // REDUX
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects)


    const renderProjectsList = () => {
        return projects.map(function (item, i) {
            return (
                <Project key={i} data={item} />
            )
        })
    }

    useEffect(() => {
        axios.get('/api/projects', {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        })
            .then(res => {
                dispatch(getProjects(res.data));
            })
    }, [])

    return (
        <>
            <div className="project-container-header">
                <div className="project-container-header-section">
                    <h1>PROJETS ({1})</h1>
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