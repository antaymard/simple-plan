import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import './edit.css';

import Type from '../type/Type.js';
import SelectMasterProject from '../forms/SelectMasterProject';

const Edit = () => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });
    const [nameIsInput, setNameIsInput] = useState(false);
    const [descIsInput, setDescIsInput] = useState(false);
    const location = useLocation();
    const jobs = useSelector(state => state.jobs)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleTypeChange = (type) => {
        setFormData({ ...formData, type: type });
    }
    const handleProjectChange = (e) => {
        setFormData({ ...formData, projectId: e.target.value });
    }

    useEffect(() => {
        // Set default masterproject regarding url query
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
        // Get job data from redux store, using the id
        if (jobs.filter(i => i._id === id)[0]) {
            setFormData(jobs.filter(i => i._id === id)[0]);
        }
    }, [])

    const submitFormData = () => {
        // action call here
        console.log("posting formData");
    }

    return (
        <div className="edit-section">
            <div className='edit-section-header'>
                <div className="d-flex flex-row justify-content-between">
                    <div onClick={() => handleTypeChange('learn')}>
                        <Type type="learn"
                            selected={formData.type == 'learn' ? 'selected' : 'unselected'} />
                    </div>
                    <div onClick={() => handleTypeChange('build')}>
                        <Type type="build" selected={formData.type == 'build' ? 'selected' : 'unselected'} />
                    </div>
                    <div onClick={() => handleTypeChange('check')}>
                        <Type type="check" selected={formData.type == 'check' ? 'selected' : 'unselected'} />
                    </div>
                    <div onClick={() => handleTypeChange('todo')}>
                        <Type type="todo" selected={formData.type == 'todo' ? 'selected' : 'unselected'} />
                    </div>
                </div>
                <div>
                    X
                </div>
            </div>
            <div className="row edit-section-content">
                <div className="col-8 edit-left-section">
                    {
                        nameIsInput ?
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
                            </h1>
                    }
                    <p className="edit-label-name">Projet</p>
                    <SelectMasterProject
                        handleChange={handleProjectChange}
                        projectId={formData.projectId}
                    />
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
                        <p id="description" onClick={() => setDescIsInput(true)}
                            className={formData.description ? null : "is-empty"}>
                            {formData.description}
                        </p>
                    }
                    <p className="edit-label-name">Avancement</p>
                    <input type="range" min={0} max={100} step={1} name="progress" value={formData.progress} onChange={handleChange}></input>
                </div>
                <div className='col-4 edit-right-section'>
                </div>
            </div>

        </div>
    )
}

export default Edit;