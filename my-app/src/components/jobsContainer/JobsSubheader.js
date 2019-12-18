import React, { useEffect, useState } from 'react';
import { useStore } from "react-hookstore";
import axios from 'axios';
import Moment from 'react-moment';

import JobProjectForm from '../forms/JobProjectForm.js';
import ModalPanel from '../modalPanel/ModalPanel.js';
import useModal from '../modalPanel/useModal.js';


const JobsSubheader = () => {

    const { isOpen, toggle } = useModal();
    const [ filter, setFilter ] = useStore('jobFilterStore');

    const [ projectInfo, setProjectInfo ] = useState({});

    const editFilter = ( e ) => {
        let _filter = {};
        setFilter( _filter );
    }

    useEffect(() => {
        // on init, get project infos
        if (filter.projectId) {
            axios.get('/api/project/' + filter.projectId, {
                headers : {
                    "x-access-token" : localStorage.getItem('token')
                }
            })
            .then(res => {
                setProjectInfo(res.data);
            })    
        }
    }, [ filter.projectId ])

    if ( filter.projectId ) {
        return (
            <div className="jobs-subheader">
                <div className="header">
                    <h3>{projectInfo.name}</h3>
                    <span>- Started <Moment fromNow>{projectInfo.createdOn}</Moment></span>
                </div>
                <div className='body'>
                    In progress...
                </div>
                <div className="footer">
                    <a href='#' onClick={editFilter}>ALL</a>
                    <button className="addJob-button" onClick={toggle}>+ NEW JOB</button> 
                </div>
                <ModalPanel isOpen={isOpen}>
                    <JobProjectForm hide={toggle} formType="job"/>
                </ModalPanel>
            </div>
        )    
    } else return null;
}

export default JobsSubheader;