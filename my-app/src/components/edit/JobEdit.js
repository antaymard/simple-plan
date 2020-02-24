import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ObjectId } from 'bson';
import queryString from 'query-string';
import Calendar from 'react-calendar';
import WeekNumber from '../job/WeekNumbers.js';
import Moment from 'react-moment';

import './edit.css';
import { updateJob, newJob, deleteJob } from '../../actions/jobActions';

import Type from '../type/Type.js';

const Edit = (props) => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        projectId: "",
        progress: 0,
        weekNumber: []
    });
    const [nameIsInput, setNameIsInput] = useState(false);
    const [descIsInput, setDescIsInput] = useState(false);
    const [confirmDeletePop, setConfirmDeletePopup] = useState(false);
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

    // CALENDAR
    const changeDeadline = (val) => {
        setFormData({ ...formData, deadline: val.toISOString() })
    }

    const changeWeekNumber = (val) => {
        // si déjà dans array, le retire, sinon l'ajoute !
        let _weeknb = formData.weekNumber;
        if (_weeknb.indexOf(val) > -1) {
            _weeknb = _weeknb.filter((e) => e !== val);
        } else {
            _weeknb.push(val);
        }
        _weeknb.sort((a, b) => a - b)
        setFormData({ ...formData, weekNumber: _weeknb })
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
                <div className="col-8 edit-left-section">

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
                                    className={"description markdown-edit" + (formData.description ? "" : " is-empty")}
                                />
                            </div> :
                            <p onClick={() => setDescIsInput(true)}
                                className={"description" + (formData.description ? "" : " is-empty")}>
                                {formData.description}
                            </p>
                    }


                    {/* PROGRESSBAR */}
                    <p className="edit-label-name">Avancement</p>
                    <input type="range" min={0} max={100} step={1} name="progress" value={formData.progress} onChange={handleChange}></input>


                    <button className="save-job-button" onClick={submitFormData}>SAVE</button>
                </div>

                {/* RIGHT SECTION */}
                <div className='col-4 edit-right-section'>

                    {/* CALENDAR */}
                    <p className='edit-label-name'>Calendrier</p>
                    <Calendar
                        value={new Date()}
                        formatShortWeekday={(locale, value) => ['D', 'L', 'M', 'M', 'J', 'V', 'S'][value.getDay()]}
                        formatMonth={(local, value) => ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'][value.getMonth()]}
                        next2Label={null}
                        prev2Label={null}
                        showWeekNumbers
                        onClickWeekNumber={changeWeekNumber}
                        onChange={changeDeadline}
                    />
                    <div className="sub-calendar-section">
                        <p>Semaines</p>
                        <div className="d-flex align-items-center justify-content-between">
                            {
                                formData.weekNumber.length > 0 ? <WeekNumber weeknb={formData.weekNumber} /> :
                                    <p><i>Pas de semaine allouée</i></p>
                            }
                            <button onClick={() => setFormData({ ...formData, weekNumber: [] })}>✕</button>
                        </div>
                    </div>
                    <div className="sub-calendar-section">
                        <p>Deadline</p>
                        <div className="d-flex align-items-center justify-content-between">

                            {
                                formData.deadline ?
                                    <Moment format="DD/MM/YYYY">
                                        {formData.deadline}
                                    </Moment> :
                                    <p><i>Pas de deadline</i></p>
                            }
                            <button onClick={() => setFormData({ ...formData, deadline: null })}>✕</button>
                        </div>
                    </div>
                    <div style={{ position: "relative", width: "100%" }}>
                        <button className="delete-job-button" style={{ marginTop: "50px" }} onClick={() => setConfirmDeletePopup(true)}>Delete Job</button>
                        {confirmDeletePop ? <div className="confirm-delete-popup">
                            <div className="d-flex align-items-center justify-content-between" style={{ marginBottom: "7px" }}>
                                <p>Are you sure ?</p>
                                <button onClick={() => setConfirmDeletePopup(false)}>X</button>
                            </div>
                            <button className="delete-job-button" onClick={deleteThisJob}>Yes delete this job</button>
                        </div> : null}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Edit;