import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SelectMasterProject = (props) => {

    const [ projectList, setProjectList ] = useState([]);
    
    useEffect(() => {
        axios.get('/api/projects', {
            headers : {
                "x-access-token" : localStorage.getItem('token')
            }
        })
        .then(res => {
            setProjectList(res.data);
        })
        .catch(err => console.log(err))
    }, [])

    const renderOptions = () => {
        return projectList.map((item, i) => {
        return <option key={i} value={item._id}>{item.name}</option>
        })
    }

    return (
        <>
            {console.log(props.projectId)}
            <select onChange={props.handleChange} value={props.projectId}>
                <option value="">Sélectionner un projet</option>
                {renderOptions()}
            </select>
        </>
    )
}

export default SelectMasterProject;