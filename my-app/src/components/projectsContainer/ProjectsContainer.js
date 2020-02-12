import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../actions/projectActions';

import "./projectsContainer.css";

import Project from '../project/Project.js';
import ModalPanel from '../modalPanel/ModalPanel.js';
import useModal from '../modalPanel/useModal.js';
import JobProjectForm from '../forms/JobProjectForm.js';


const ProjectsContainer = (props) => {

    const { isOpen, toggle } = useModal();
    const [filter, setFilter] = useState("active");

    // REDUX
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects)

    useEffect(() => {
        dispatch(getProjects());
    }, [filter])

    const renderProjectsList = () => {
        if (filter === "all") {
            return projects.map((item, i) => {
                return (
                    <Project key={i} data={item} />
                )
            })
        } else {
            return projects.map((item, i) => {
                if (item.status === filter) {
                    return (
                        <Project key={i} data={item} />
                    )
                }
            })
        }
    }

    const onFilterClick = () => {
        let a = ["active", 'completed', "stopped", "deleted", "all"];
        let i = a.indexOf(filter);
        if (i < a.length - 1) {
            i++;
            setFilter(a[i]);
        } else {
            setFilter("active");
        }
    }

    return (
        <>
            {console.log(filter)}
            <div className="project-container-header">
                <div className="project-container-header-section">
                    <h1>PROJETS ({projects.length})</h1>
                </div>
                <div className="project-container-header-section">
                    <button onClick={onFilterClick} className='filter-button'>{filter}</button>
                    <button className="addProject-button" onClick={toggle}>+  PROJET</button>
                </div>
            </div>
            <div className="projectsList-section">
                {renderProjectsList(filter)}
            </div>
            <ModalPanel isOpen={isOpen}>
                <JobProjectForm hide={toggle} formType="project" />
            </ModalPanel>
        </>
    )

}

export default ProjectsContainer;