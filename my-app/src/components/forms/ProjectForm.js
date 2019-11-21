import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectForm = (props) => {

    let defaultValues = {
        name : "",
        description : "",
        coverImage : ""
    }

    const [ formData, setFormData ] = useState(props.data || defaultValues);
    const confirmAction = props.data ? "EDIT" : "NEW";

    useEffect(() => {
        if (confirmAction === "EDIT") {
            setFormData(props.data);
        }
    }, [ props.data ])

    const handleChange = (e) => {
        let obj = formData;
        obj[e.target.name] = e.target.value;
        setFormData({ ...formData, ...obj });
    }

    const sendFormData = () => {
        if (confirmAction === 'NEW') {
            axios.post('/api/project', formData)
            .then(res => {
                if (res.data === "ok") {
                    props.hide();
                    // trigger api call refresh
                }
                console.log(res.data);
            })
        }
        else if ( confirmAction === "EDIT" ) {
            axios.put('/api/project', formData)
            .then(res => {
                if (res.data === "ok") {
                    props.hide();
                }
            })
        }
    }

    const deleteObj = () => {
        axios.delete('/api/project/' + props.data._id, formData)
        .then(res => {
            if (res.data === "ok") {
                props.hide();
            }
        })
        .catch(err => console.log(err))
    }

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

export default ProjectForm;
