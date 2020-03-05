import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import { ObjectId } from "bson";
import { updateProject, deleteProject } from '../../actions/projectActions.js';
import { useDispatch } from 'react-redux';
import TextareaAutosize from 'react-autosize-textarea';
import Calendar from 'react-calendar';
import Moment from 'react-moment';


import './edit.css';
import './projectEdit.css';

const ProjectEdit = (props) => {

    let defaultValues = {
        _id: new ObjectId().toString(),
        name: "",
        description: "",
        coverImage: "",
        createdOn: new Date(),
        resources: [],
        status: "active",
        dayNumber: []
    }

    const [formData, setFormData] = useState(props.data || defaultValues);
    const [nameIsInput, setNameIsInput] = useState(false);
    const [descIsInput, setDescIsInput] = useState(false);
    const [confirmDeletePop, setConfirmDeletePopup] = useState(false);
    const confirmAction = props.data ? "EDIT" : "NEW";
    const dispatch = useDispatch();

    useEffect(() => {
        // Pre fill the input if it is an edition process
        if (confirmAction === "EDIT") {
            // setFormData(props.data);
        } else if (confirmAction === "NEW") {
        }
        console.log(props)
    }, [])

    const handleChange = (e) => {
        let obj = formData;
        obj[e.target.name] = e.target.value;
        setFormData({ ...formData, ...obj });
    }
    // CALENDAR
    const changeDeadline = (val) => {
        setFormData({ ...formData, deadline: val.toISOString() })
    }
    const handleDayNumber = (i) => {
        // If already in array, delete it, if not add it
        let _daynb = formData.dayNumber;
        if (_daynb.indexOf(i) > -1) {
            _daynb = _daynb.filter((e) => e !== i);
        } else {
            _daynb.push(i);
        }
        _daynb.sort((a, b) => a - b)
        setFormData({ ...formData, dayNumber: _daynb })
    }

    const renderDays = () => {
        let dayList = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
        return dayList.map((item, i) => {
            return (
                <div key={i} className={"dayNumber-item " + (formData.dayNumber.indexOf(i) > -1 ? "dayNumber-item-isSelected" : "")}
                    onClick={() => handleDayNumber(i)}>{item}
                </div>
            )
        })
    }


    const submitFormData = () => {
        console.log(formData)
        dispatch(updateProject(formData));
        props.hide();
    }

    // TO DO
    const deleteObj = () => {
        dispatch(deleteProject(formData._id));
        props.hide();
    }

    if (props.isOpen) {
        console.log(formData)
        return ReactDOM.createPortal(
            <div className="modal-background">
                <div className="edit-section">
                    <div className="edit-section-header">
                        {/* NAME INPUT */}
                        {nameIsInput ?
                            <input autoFocus
                                id="input-project-name"
                                onBlur={() => setNameIsInput(false)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setNameIsInput(false)
                                        // submitFormData()
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
                        <button className="close-panel-button" onClick={props.hide}>✕</button>
                    </div>
                    <div className="edit-section-content">
                        <div className="edit-left-section">
                            {/* DESCRIPTION */}
                            <p className="edit-label-name" style={{ marginTop: 0 }}>Description</p>
                            {descIsInput ?
                                <>
                                    <TextareaAutosize
                                        autoFocus
                                        name='description'
                                        value={formData.description}
                                        onChange={handleChange}
                                        onBlur={() => setDescIsInput(false)} >

                                    </TextareaAutosize>
                                </> :
                                formData.description ?
                                    <p onClick={() => setDescIsInput(true)}>
                                        {/* className={"description markdown-edit" + (formData.description ? "" : " is-empty")} */}
                                        {formData.description}
                                    </p> :
                                    <p onClick={() => setDescIsInput(true)}
                                        className={"description" + (formData.description ? "" : " is-empty")}>
                                        {formData.description}
                                    </p>
                            }
                            {/* PROJECT IMAGE */}
                            <p className="edit-label-name">Image du projet</p>
                            <div className="d-flex flex-row">
                                <img id="display-coverImage" src={formData.coverImage} />
                                <input name="coverImage" onChange={handleChange} placeholder="https://" autoComplete="off" id="input-coverImage" value={formData.coverImage} />
                            </div>
                            {/* DAYNUMBER */}
                            <p className="edit-label-name">Jours de la semaine</p>
                            <div id="dayNumber-section">
                                {renderDays()}
                            </div>
                            {/* SAVE */}
                            <button id="save-project-button" onClick={submitFormData}>SAVE</button>
                        </div>
                        <div className="edit-right-section">
                            {/* CALENDAR */}
                            <p className='edit-label-name' style={{ marginTop: 0 }}>Calendrier</p>
                            <Calendar
                                value={new Date()}
                                formatShortWeekday={(locale, value) => ['D', 'L', 'M', 'M', 'J', 'V', 'S'][value.getDay()]}
                                formatMonth={(local, value) => ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'][value.getMonth()]}
                                next2Label={null}
                                prev2Label={null}
                                showWeekNumbers
                                onChange={changeDeadline}
                            />
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
                            <p className='edit-label-name'>Status</p>
                            <select name="status" value={formData.status} onChange={handleChange}>
                                <option value="active">Actif</option>
                                <option value="completed">Terminé</option>
                                <option value="paused">En pause</option>
                                <option value="abandoned">Abandonné</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>, document.body
        )
    }
    else return null;
}

export default ProjectEdit;