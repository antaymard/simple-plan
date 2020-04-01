import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from 'react-calendar';
import WeekNumber from '../job/WeekNumbers.js';
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import TextareaAutosize from 'react-autosize-textarea';
import axios from "axios";
import breaks from 'remark-breaks';

import TrashIcon from '../icons/TrashIcon.js';
import PlayIcon from '../icons/PlayIcon.js';
import DoneIcon from '../icons/DoneIcon.js';
import PlusIcon from '../icons/PlusIcon.js';


import './edit.css';
import './jobEdit.css';

import { updateJob, newJob, deleteJob } from '../../actions/jobActions';

import Type from '../type/Type.js';
import ResourcesList from '../resourcesList/ResourcesList.js';

var autosave = null;
let updateData = {};
let id = "";

momentDurationFormatSetup(moment);

const Edit = (props) => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        projectId: "",
        progress: 0,
        weekNumber: [],
    });
    // Data that are updated
    // const [updateData, setUpdateData] = useState({});

    // Input / popup UI control
    const [nameIsInput, setNameIsInput] = useState(false);
    const [descIsInput, setDescIsInput] = useState(false);
    const [confirmDeletePop, setConfirmDeletePopup] = useState(false);
    const [isJobCreation, setIsJobCreation] = useState(props.isJobCreation);

    // const [id, setId] = useState('');
    const location = useLocation();

    // REACT REDUX
    const jobs = useSelector(state => state.jobs);
    const projects = useSelector(state => state.projects);
    const dispatch = useDispatch();

    // onMount
    useEffect(() => {
        // If a project was open, set it as default in masterProject select
        console.log(props.selectedProject) // Got through the router state from the + new job link/button
        if (props.selectedProject) {
            setFormData({
                ...formData, projectId: props.selectedProject
            })
        }

        // Clean update data
        updateData = {};

        // Get job id from URL
        let _path = location.pathname;
        _path = _path.split('/');
        let _index = _path.indexOf('j');
        id = _path[_index + 1];

        // FILL WITH DATA
        // If redux store exists, get the job from the state
        if (jobs.filter(i => i._id === id)[0]) {
            setFormData(jobs.filter(i => i._id === id)[0]);
        }
        // If not redux state (copy/paste the job url), get the info with a call
        else {
            axios.get('/api/job/' + id, {
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    if (res.data) {
                        setFormData(res.data)
                    }
                })

        }

        // On mount listen for ESC keydown
        document.addEventListener("keydown", handleKeyboardAction, false);
        // On unmount, clean the listener
        return () => {
            document.removeEventListener("keydown", handleKeyboardAction, false);
        }
    }, []);

    // Render selectMasterProject options
    const renderMasterProjects = () => {
        // sort alphabetically
        let _projects = [...projects]
        _projects.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1
            }
            return 0;
        });

        return _projects.map((item, i) => {
            return <option key={i} value={item._id}>{item.name}</option>
        })
    }

    const renderPomodoros = () => {
        let pomoArray = [];
        for (let i = 0; i < formData.pomodoro; i++) {
            pomoArray.push('work');
            if (i < formData.pomodoro - 1) {
                if (i !== 0 && (i + 1) % 4 === 0) {
                    pomoArray.push('break-big')
                } else {
                    pomoArray.push("break-small");
                }
            }
        }
        return pomoArray.map((item, i) => {
            if (item === "work") {
                return (
                    <div className="pomodoro-work-session-pill" />
                )
            } else if (item === "break-small") {
                return (
                    <div className="pomodoro-small-break-pill" />
                )
            } else if (item === "break-big") {
                return (
                    <div className="pomodoro-big-break-pill" />
                )
            }
        })
    }

    const handleKeyboardAction = (e) => {
        if (e.keyCode === 27) {
            props.close();
        }

        if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) {
            setDescIsInput(false);
            save();
        }
    }

    // Handle form changes and update the state
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        updateData = { ...updateData, [e.target.name]: e.target.value };
        if (e.target.name === "projectId" || e.target.name === "progress") {
            save();
        }
    }
    const handleTypeChange = (type) => {
        setFormData({ ...formData, type: type });
        updateData = { ...updateData, type: type };
        save();
    }
    // CALENDAR
    const changeDeadline = (val) => {
        if (val) {
            // Change default hour to 23:59 & update the states
            setFormData({ ...formData, deadline: moment(val).endOf('day').toString() });
            updateData = { ...updateData, deadline: moment(val).endOf('day').toString() };
            // Begin save timeout
        } else {
            setFormData({ ...formData, deadline: null });
            updateData = { ...updateData, deadline: null };
        }
        save();
    }
    const changeWeekNumber = (val) => {
        // If already in array, delete it, if not add it
        let _weeknb = [...formData.weekNumber];
        if (_weeknb.indexOf(val) > -1) {
            _weeknb = _weeknb.filter((e) => e !== val);
        } else {
            _weeknb.push(val);
        }
        _weeknb.sort((a, b) => a - b);
        // update the states
        setFormData({ ...formData, weekNumber: _weeknb });
        updateData = { ...updateData, weekNumber: _weeknb };
        // Begin save timeout
        save();
    }

    const changePomodoro = (action) => {
        if (action === "increment" && formData.pomodoro < 6) {
            setFormData({ ...formData, pomodoro: formData.pomodoro + 1 });
            updateData = { ...updateData, pomodoro: formData.pomodoro + 1 };
            save();
        } else if (action === "decrement" && formData.pomodoro >= 1) {
            setFormData({ ...formData, pomodoro: formData.pomodoro - 1 });
            updateData = { ...updateData, pomodoro: formData.pomodoro - 1 };
            save();
        }
    }

    const save = () => {
        // If not a creation, 
        // and if the update object contains at least one prop
        if (!isJobCreation && Object.keys(updateData).length > 0) {
            clearTimeout(autosave);
            autosave = setTimeout(() => {
                console.log("===== SAVED FIRED");
                console.log(updateData);
                dispatch(updateJob({ ...updateData, _id: id }));
                // Should be callback
                updateData = {};
            }, 650);
        }

    }

    const createNewJob = () => {
        // action call here
        if (isJobCreation) {
            dispatch(newJob({ ...formData, _id: id }));
            props.close();
        }
    }

    const deleteThisJob = () => {
        dispatch(deleteJob(id));
        props.close();
    }

    return (
        <>
            <div className="edit-section" >
                {console.log(formData)}
                <div className='edit-section-header'>
                    <div className="d-flex flex-row justify-content-between">
                        <div onClick={() => handleTypeChange('learn')}>
                            <Type type="learn" size='big'
                                selected={formData.type == 'learn' ? 'selected' : 'unselected'} />
                        </div>
                        <div onClick={() => handleTypeChange('think')}>
                            <Type type="think" size='big'
                                selected={formData.type == 'think' ? 'selected' : 'unselected'} />
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
                {/* NAME INPUT */}
                {nameIsInput ?
                    <input autoFocus
                        onBlur={() => { setNameIsInput(false); save() }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setNameIsInput(false);
                                save();
                            }
                        }}
                        type='text'
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="off" /> :
                    <h1 id="name"
                        className={formData.name ? null : "is-empty"}
                        onClick={() => setNameIsInput(true)}>
                        {formData.name}
                    </h1>
                }
                <div className="edit-section-content">
                    <div className="edit-left-section">

                        {/* MASTER PROJECT SELECTION */}
                        <p className="edit-label-name">Projet</p>
                        <select onChange={handleChange} name="projectId" value={typeof formData.projectId === 'string' ? formData.projectId : formData.projectId._id ? formData.projectId._id : null}>
                            <option value="">Sélectionner un projet</option>
                            {renderMasterProjects()}
                        </select>


                        {/* DESCRIPTION TEXTAREA */}
                        <p className="edit-label-name">Description</p>
                        {descIsInput ?
                            <>
                                <TextareaAutosize
                                    autoFocus
                                    name='description'
                                    value={formData.description}
                                    onChange={handleChange}
                                    onBlur={() => { setDescIsInput(false); save() }} >
                                </TextareaAutosize>
                            </> :
                            formData.description ?
                                <div onClick={() => setDescIsInput(true)}>
                                    <ReactMarkdown
                                        linkTarget="_blank"
                                        plugins={[breaks]}
                                        source={formData.description}
                                        className={"description markdown-description" + (formData.description ? "" : " is-empty")}
                                    />
                                </div> :
                                <p onClick={() => setDescIsInput(true)}
                                    className={"description" + (formData.description ? "" : " is-empty")}>
                                    {formData.description}
                                </p>
                        }
                        <hr />
                        <p className="low-level-info">Créé le {moment(formData.createdOn).format("DD MMMM YYYY")}</p>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className='edit-right-section'>

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
                                <button onClick={() => {
                                    setFormData({ ...formData, weekNumber: [] });
                                    updateData = { ...updateData, weekNumber: [] };
                                    save();
                                }}>✕</button>
                            </div>
                        </div>
                        <div className="sub-calendar-section">
                            <p>Deadline</p>
                            <div className="d-flex align-items-center justify-content-between">

                                {
                                    formData.deadline ?
                                        moment(formData.deadline).utcOffset(0).format("DD MMMM YYYY")
                                        : < p ><i>Pas de deadline</i></p>
                                }
                                <button onClick={() => changeDeadline(null)}>✕</button>
                            </div>
                        </div>

                        {/* POMODORO */}
                        <div className="d-flex flex-row align-items-center justify-content-between">
                            <p className='edit-label-name'>Pomodoro</p>
                            <p className='edit-label-name'>{
                                moment.duration(Math.max((formData.pomodoro * 25 + (formData.pomodoro - 1) * 5 + Math.floor((formData.pomodoro - 1) / 4) * 20 - Math.floor((formData.pomodoro - 1) / 4) * 5) / 60, 0), "minutes").format()
                            }</p>
                        </div>
                        <div className="pomodoro-section">
                            <div className='d-flex flex-row align-items-center'>
                                <button onClick={() => changePomodoro('decrement')}>-</button>
                                {renderPomodoros()}
                            </div>
                            <button onClick={() => changePomodoro('increment')}>+</button>
                        </div>

                    </div>
                </div>
            </div >
            <div className="job-edit-footer">
                <div className='progress-section'>
                    {/* PROGRESSBAR */}
                    <p className="edit-label-name" style={{ color: "white", marginTop: 0 }}>Avancement</p>
                    <input type="range" min={0} max={100} step={1} name="progress"
                        value={formData.progress}
                        onChange={handleChange}
                    />
                </div>
                {isJobCreation ?
                    <div className="edit-button-section">
                        <p onClick={() => props.close()}>Annuler</p>
                        <button className="save-job-button" onClick={() => createNewJob()}>SAVE</button>
                    </div>
                    : <div className="edit-button-section">

                        {/* INPROGRESS BUTTON */}
                        <button
                            className={formData.isInProgress ? "isToggled" : ""}
                            onClick={() => {
                                if (formData.isCompleted) {
                                    setFormData({ ...formData, isCompleted: false, isInProgress: true });
                                    updateData = { ...updateData, isCompleted: false, isInProgress: true };
                                } else {
                                    setFormData({ ...formData, isInProgress: !formData.isInProgress });
                                    updateData = { ...updateData, isInProgress: !formData.isInProgress };
                                }
                                save();
                            }}
                        ><PlayIcon /></button>

                        {/* DEEPWORK BUTTON */}
                        <button><PlusIcon /></button>

                        {/* SUPPRESS BUTTON */}
                        <div style={{ position: "relative" }}>
                            <button onClick={() => setConfirmDeletePopup(!confirmDeletePop)}><TrashIcon /></button>
                            {confirmDeletePop ? <div className="confirm-delete-popup" onMouseLeave={() => setConfirmDeletePopup(false)}>
                                <p className="hintText">Are you sure ?</p>
                                <button className="delete-job-button" style={{ width: "100%" }} onClick={deleteThisJob}>Yes delete this job</button>
                            </div> : null}
                        </div>

                        {/* COMPLETE BUTTON */}
                        <button
                            className={formData.isCompleted ? "isToggled" : ""}
                            onClick={() => {
                                // Turn into uncompleted
                                if (formData.isCompleted) {
                                    setFormData({ ...formData, isCompleted: false, isInProgress: false });
                                    updateData = { ...updateData, isCompleted: false, isInProgress: false };
                                }
                                // Turn into completed
                                else if (!formData.isCompleted) {
                                    setFormData({ ...formData, isCompleted: true, isInProgress: false, progress: 100, completedOn: new Date() });
                                    updateData = { ...updateData, isCompleted: true, isInProgress: false, progress: 100, completedOnOn: new Date() };
                                }
                                save();
                            }}
                        ><DoneIcon /></button>
                    </div>}
            </div>
        </>
    )
}

export default Edit;