import React, { useState, useEffect } from 'react';
import { useStore } from 'react-hookstore';
import axios from 'axios';

import Type from '../type/Type.js';
import SelectMasterProject from './SelectMasterProject.js';
import useGetJobs from '../hooks/useGetJobs.js';
import useGetProjects from '../hooks/useGetProjects.js';

const JobProjectForm = (props) => {

    let defaultValues;
    if (props.formType === "job") {
        defaultValues = {
            name : "",
            description : "",
            progress : 0,
            type : "",
            projectId : null,
            schedule : {}    
        };
    } else if (props.formType === "project") {
        defaultValues = {
            name : "",
            description : "",
            coverImage : ""    
        }
    }

    const [ formData, setFormData ] = useState(props.data || defaultValues)
    const confirmAction = props.data ? "EDIT" : "NEW";
    const { _jobsList, getJobs } = useGetJobs();
    const { _projectsList, getProjects } = useGetProjects();
    const [ filter, setFilter ] = useStore('jobFilterStore');


    useEffect(() => {
        if (confirmAction === "EDIT") { // Edition car possède des datas
            setFormData(props.data);
            if (props.data.projectId && props.data.projectId._id) {
                handleProjectChange({ target : { value : props.data.projectId._id }})
            }
        } else if (confirmAction === "NEW") {
            if (filter.projectId) {
                handleProjectChange({ target : { value : filter.projectId } })
            }
        }
    }, [])

    const handleChange = (e) => {
        let obj = formData;
        obj[e.target.name] = e.target.value;
        setFormData({ ...formData, ...obj });
    }

    var headers = {
        "x-access-token" : localStorage.getItem('token')
    }

    const sendFormData = () => {
        console.log(formData)
        if ( formData.projectId === "" ) {
            formData.projectId = null;
        }
        if( confirmAction === "NEW") {
            axios.post('/api/' + props.formType, formData, { headers : headers })
            .then(res => {
                if (res.data === "ok") {
                    props.hide();
                    props.formType === 'jobs' ? getJobs() : getProjects();
                }
            }); 
        } 
        else if ( confirmAction === "EDIT" ) {
            axios.put('/api/' + props.formType, formData, { headers : headers })
            .then(res => {
                if (res.data === 'ok') {
                    props.hide();
                    props.formType === 'jobs' ? getJobs() : getProjects();
                }
            })
        }
    }

    const deleteObj = () => {
        axios.delete('/api/' + props.formType + '/' + props.data._id, { headers : headers })
        .then(res => {
            if (res.data === "ok") {
                props.hide();
                getJobs();
            }
        })
        .catch(err => console.log(err))
    }

    // Specific to jobs
    const handleProjectChange = (e) => {
        let obj = formData;
        obj.projectId = e.target.value;
        setFormData({ ...formData, ...obj });
    }

    const handleTypeChange = (type) => {
        let obj = formData;
        obj.type = type;
        setFormData({ ...formData, ...obj });
    }

    if (props.formType === "job") {
        return(
            <>  
                {console.log(formData)}
                <h1>{confirmAction === "EDIT" ? "MODIFICATION JOB" : "NOUVEAU JOB"}</h1>
                <div className='input-group'>
                    <p>Nom</p>
                    <input type='text' name="name" value={formData.name} onChange={handleChange} autoComplete="off"></input>
                </div>
                <div className='input-group'>
                    <p>Description</p>
                    <textarea maxLength={140} rows={5} name='description' value={formData.description} onChange={handleChange}/>
                </div>
                <div className='input-group'>
                    <p>Master project</p>
                    <SelectMasterProject handleChange={handleProjectChange} projectId={formData.projectId}/>
                </div>
                <div className="input-group">
                    <p>Avancement</p>
                    <input type="range" min={0} max={100} step={1} name="progress" value={formData.progress} onChange={handleChange}></input>
                </div>
                <div className="input-group">
                    <p>Type</p>
                    <div className="d-flex flex-row justify-content-between">
                        <div onClick={() => handleTypeChange('learn')}>
                            <Type type="learn" 
                            selected={formData.type == 'learn' ? 'selected' : 'unselected'}/>
                        </div>
                        <div onClick={() => handleTypeChange('build')}>
                            <Type type="build" selected={formData.type == 'build' ? 'selected' : 'unselected'}/>
                        </div>
                        <div onClick={() => handleTypeChange('check')}>
                            <Type type="check" selected={formData.type == 'check' ? 'selected' : 'unselected'}/>
                        </div>
                        <div onClick={() => handleTypeChange('todo')}>
                            <Type type="todo" selected={formData.type == 'todo' ? 'selected' : 'unselected'}/>
                        </div>
                    </div>
                </div>
                <div className="formButton-section">
                <button className="formButton-cancel" onClick={props.hide}>🡠</button>
                {confirmAction === "EDIT" ? <button className="formButton-delete" onClick={deleteObj}>✕</button> : ""}
                <button className="formButton-confirm" onClick={sendFormData}>✓</button>
                </div>
            </>
        )    
    } else if (props.formType === 'project') {
        return(
            <>
                <h1>{props.data ? "MODIFICATION JOB" : "NOUVEAU JOB"}</h1>
                <div className='input-group'>
                    <p>Nom</p>
                    <input type='text' name="name" value={formData.name} onChange={handleChange}></input>
                </div>
                <div className='input-group'>
                    <p>Description</p>
                    <textarea maxLength={140} rows={5} name='description' value={formData.description} onChange={handleChange}/>
                </div>
                <div className='input-group'>
                    <p>Image de couverture</p>
                    <input type='text' name="coverImage" placeholder="https://" value={formData.coverImage} onChange={handleChange}></input>
                </div>
                <div className="formButton-section">
                    <button className="formButton-cancel" onClick={props.hide}>🡠</button>
                    {confirmAction === "EDIT" ? <button className="formButton-delete" onClick={deleteObj}>✕</button> : ""}
                    <button className="formButton-confirm" onClick={sendFormData}>✓</button>
                </div>
            </>
        )    
    }
}

export default JobProjectForm;
