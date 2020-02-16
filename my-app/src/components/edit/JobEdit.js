import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import './edit.css';

import Type from '../type/Type.js';
import SelectMasterProject from '../forms/SelectMasterProject';

const Edit = () => {

    const [formData, setFormData] = useState({
        name: ""
    });
    const [nameIsInput, setNameIsInput] = useState(true);
    const [descIsInput, setDescIsInput] = useState(true);
    const location = useLocation();

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
        console.log(formData)
    })

    useEffect(() => {
        // Set default masterproject regarding url query
        let query = queryString.parse(location.search);
        if (query.projectId) {
            setFormData({
                ...formData, projectId: query.projectId
            })
        }
    }, [])

    const submitFormData = () => {
        // action call here
        console.log("posting formData");
    }

    return (
        <div className="edit-panel">
            <div className='edit-panel-header'>
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
            <div className="row edit-panel-content">
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
                            <h1 onClick={() => { setNameIsInput(true) }}>{formData.name}</h1>
                    }
                    <p>Projet</p>
                    <SelectMasterProject
                        handleChange={handleProjectChange}
                        projectId={formData.projectId}
                    />
                    <p>Description</p>
                    {descIsInput ? <textarea
                        rows={5}
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        onBlur={() => setDescIsInput(false)} /> :
                        <p onClick={() => setDescIsInput(true)}>
                            {formData.description}
                        </p>
                    }
                    <p>Avancement</p>
                    <input type="range" min={0} max={100} step={1} name="progress" value={formData.progress} onChange={handleChange}></input>
                </div>
                <div className='col-4 edit-right-section'>
                </div>
            </div>

        </div>
    )
}

export default Edit;