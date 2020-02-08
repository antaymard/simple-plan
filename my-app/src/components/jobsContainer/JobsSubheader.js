import React, { useEffect, useState } from 'react';
import { useStore } from "react-hookstore";
import axios from 'axios';
import Moment from 'react-moment';
import moment from 'moment';

import JobProjectForm from '../forms/JobProjectForm.js';
import ModalPanel from '../modalPanel/ModalPanel.js';
import useModal from '../modalPanel/useModal.js';


const JobsSubheader = () => {

    const { isOpen, toggle } = useModal();
    const [ filter, setFilter ] = useStore('jobFilterStore');

    const [ projectInfo, setProjectInfo ] = useState({});

    const editFilter = (e) => {
        switch (e.target.name) {
            case "all" :
                setFilter({});
                break;
            case 'thisWeek' : 
                let _filter = filter;
                _filter.weekNumber = moment().format('W');
                setFilter( _filter );
                console.log(filter);
                break;
            default : 
                console.log('no filter action found');
        }
        
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
    }, [ filter ])

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
                    <a href='#' name="all" onClick={editFilter}>ALL</a>
                    <a href="#" name="thisWeek" onClick={editFilter}>THIS WEEK</a>
                    <a href="#" name="late" onClick={editFilter}>LATE</a>
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