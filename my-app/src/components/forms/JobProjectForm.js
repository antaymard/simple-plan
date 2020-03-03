import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ObjectId } from "bson";
import { updateProject, deleteProject } from '../../actions/projectActions.js';
import { useDispatch } from 'react-redux';

const JobProjectForm = (props) => {

    let defaultValues = {
        _id: new ObjectId().toString(),
        name: "",
        description: "",
        coverImage: "",
        createdOn: new Date(),
        resources: [],
        status: "active"
    }

    const [formData, setFormData] = useState(props.data || defaultValues);
    const confirmAction = props.data ? "EDIT" : "NEW";
    const dispatch = useDispatch();

    let headers = {
        "x-access-token": localStorage.getItem('token')
    };

    useEffect(() => {
        // Pre fill the input if it is an edition process
        if (confirmAction === "EDIT") {
            setFormData(props.data);
        } else if (confirmAction === "NEW") {
        }
    }, [])

    const handleChange = (e) => {
        console.log(e.target.value)
        let obj = formData;
        obj[e.target.name] = e.target.value;
        setFormData({ ...formData, ...obj });
    }

    const submitForm = () => {
        console.log(formData)
        dispatch(updateProject(formData));
        props.hide();
    }

    // TO DO
    const deleteObj = () => {
        dispatch(deleteProject(formData._id));
        props.hide();
    }

    return (
        <>
            <h1>{props.data ? "MODIFICATION JOB" : "NOUVEAU JOB"}</h1>
            <div className='input-group'>
                <p>Nom</p>
                <input type='text' name="name" value={formData.name} onChange={handleChange}></input>
            </div>
            <div className='input-group'>
                <p>Status</p>
                <select onChange={handleChange} name="status">
                    <option value="active">Actif</option>
                    <option value="completed">Terminé</option>
                    <option value="stopped">Arrêté</option>
                </select>
            </div>
            <div className='input-group'>
                <p>Description</p>
                <textarea maxLength={140} rows={5} name='description' value={formData.description} onChange={handleChange} />
            </div>
            <div className='input-group'>
                <p>Image de couverture</p>
                <input type='text' name="coverImage" placeholder="https://" value={formData.coverImage} onChange={handleChange}></input>
            </div>
            <div className="formButton-section">
                <button className="formButton-cancel" onClick={props.hide}>🡠</button>
                <button className="formButton-delete" onClick={deleteObj}>XXX</button>
                <button className="formButton-confirm" onClick={submitForm}>✓</button>
            </div>
        </>
    )
}

export default JobProjectForm;
