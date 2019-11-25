import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Type from '../type/Type.js';
import SelectMasterProject from './SelectMasterProject.js';
import useGetJobs from '../hooks/useGetJobs.js';


const JobForm = (props) => {

    let defaultValues = {
        name : "",
        description : "",
        progress : 0,
        type : "",
        projectId : {},
        schedule : {}
    }

    const [ formData, setFormData ] = useState(props.data || defaultValues)
    const confirmAction = props.data ? "EDIT" : "NEW";
    const { _jobsList, getJobs } = useGetJobs();


    useEffect(() => {
        if (confirmAction === "EDIT") { // Edition car possède des datas
            setFormData(props.data);
        } else if (confirmAction === "NEW") {
            // Get project context and pre fill
        }
    }, [ props.data ])

    const handleChange = (e) => {
        console.log(e.target)
        let obj = formData;
        obj[e.target.name] = e.target.value;
        setFormData({ ...formData, ...obj });
    }

    const sendFormData = () => {
        console.log(formData)
        if( confirmAction === "NEW" ) {
            axios.post('/api/job', formData)
            .then(res => {
                if (res.data === "ok") {
                    props.hide();
                    // trigger api call refresh
                    getJobs();
                }
            }); 
        } 
        else if ( confirmAction === "EDIT" ) {
            axios.put('/api/job', formData)
            .then(res => {
                if (res.data === 'ok') {
                    props.hide();
                    // refresh too
                    getJobs();
                }
            })
        }
    }

    const deleteObj = () => {
        axios.delete('/api/job/' + props.data._id, formData)
        .then(res => {
            if (res.data === "ok") {
                props.hide();
                getJobs();
            }
        })
        .catch(err => console.log(err))
    }

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


    return(
        <>
            
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
                <SelectMasterProject change={handleProjectChange} selected={formData.projectId._id}/>
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
}


export default JobForm;
