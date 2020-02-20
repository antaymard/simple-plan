import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ObjectId } from 'bson';
import queryString from 'query-string';

import './edit.css';
import { updateJob, newJob, deleteJob } from '../../actions/jobActions';

import Type from '../type/Type.js';

const Edit = (props) => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        projectId: "",
        progress: 0
    });
    const [nameIsInput, setNameIsInput] = useState(false);
    const [descIsInput, setDescIsInput] = useState(false);
    const [id, setId] = useState('');
    const location = useLocation();

    // REACT REDUX
    const jobs = useSelector(state => state.jobs);
    const projects = useSelector(state => state.projects);
    const dispatch = useDispatch();

    // Handle form changes and update the state
    const handleChange = (e) => {
        console.log(e.target.value)
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleTypeChange = (type) => {
        setFormData({ ...formData, type: type });
    }

    // Render selectMasterProject options
    const renderOptions = () => {
        // sort alphabetically
        projects.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1
            }
            return 0;
        });

        return projects.map((item, i) => {
            return <option key={i} value={item._id}>{item.name}</option>
        })
    }

    // onMount
    useEffect(() => {
        // If a project was open, set it as default in masterProject select
        let query = queryString.parse(location.search);
        if (query.projectId) {
            setFormData({
                ...formData, projectId: query.projectId
            })
        };

        // Get job id from URL
        let id = location.pathname;
        id = id.split('/');
        let index = id.indexOf('j');
        id = id[index + 1];
        setId(id);
        // Get job data from redux store, using the id
        if (jobs.filter(i => i._id === id)[0]) {
            setFormData(jobs.filter(i => i._id === id)[0]);
        }
    }, [])

    const submitFormData = () => {
        // action call here
        console.log("posting formData");
        if (id === 'new') {
            setFormData({
                ...formData,
                _id: new ObjectId().toString()
            })
            dispatch(newJob(formData));
        } else {
            dispatch(updateJob(formData));
        }
        props.close()
    }

    const deleteThisJob = () => {
        dispatch(deleteJob(id));
        props.close();
    }

    return (
        < div className="edit-section" >
            {console.log(formData)}
            <div className='edit-section-header'>
                <div className="d-flex flex-row justify-content-between">
                    <div onClick={() => handleTypeChange('learn')}>
                        <Type type="learn" size='big'
                            selected={formData.type == 'learn' ? 'selected' : 'unselected'} />
                    </div>
                    <div onClick={() => handleTypeChange('build')}>
                        <Type type="build" size='big' selected={formData.type == 'build' ? 'selected' : 'unselected'} />
                    </div>
                    <div onClick={() => handleTypeChange('check')}>
                        <Type type="check" size='big' selected={formData.type == 'check' ? 'selected' : 'unselected'} />
                    </div>
                    <div onClick={() => handleTypeChange('todo')}>
                        <Type type="todo" size='big' selected={formData.type == 'todo' ? 'selected' : 'unselected'} />
                    </div>
                </div>
                <button className="close-panel-button" onClick={props.close}>✕</button>
            </div>
            <div className="row edit-section-content">
                <div className="col-7 edit-left-section">

                    {/* NAME INPUT */}
                    {nameIsInput ?
                        <input autoFocus
                            onBlur={() => setNameIsInput(false)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setNameIsInput(false)
                                    submitFormData()
                                }
                            }}
                            type='text'
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="off" /> :
                        <h1 id="name"
                            className={formData.name ? null : "is-empty"}
                            onClick={() => { setNameIsInput(true) }}>
                            {formData.name}
                        </h1>}


                    {/* MASTER PROJECT SELECTION */}
                    <p className="edit-label-name">Projet</p>
                    <select onChange={handleChange} name="projectId" value={formData.projectId && formData.projectId._id}>
                        <option value="">Sélectionner un projet</option>
                        {renderOptions()}
                    </select>


                    {/* DESCRIPTION TEXTAREA */}
                    <p className="edit-label-name">Description</p>
                    {descIsInput ?
                        <>
                            <textarea
                                autoFocus
                                rows={5}
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                                onBlur={() => setDescIsInput(false)} >

                            </textarea>
                        </> :
                        formData.description ?
                            <div onClick={() => setDescIsInput(true)}>
                                <ReactMarkdown
                                    source={formData.description}
                                    className={"description" + (formData.description ? null : "is-empty")}
                                />
                            </div> :

                            <p id="description" onClick={() => setDescIsInput(true)}
                                className={formData.description ? null : "is-empty"}>
                                {formData.description}
                            </p>
                    }


                    {/* PROGRESSBAR */}
                    <p className="edit-label-name">Avancement</p>
                    <input type="range" min={0} max={100} step={1} name="progress" value={formData.progress} onChange={handleChange}></input>
                </div>
                <div className='col-5 edit-right-section'>
                    <p className='edit-label-name'>Ressources</p>
                    <button onClick={deleteThisJob}>DELETE JOB</button>
                </div>
            </div>
            <div className="edit-section-footer">
                <button onClick={submitFormData}>OK</button>
            </div>

        </div >
    )
}

export default Edit;