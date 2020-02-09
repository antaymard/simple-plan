import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const SelectMasterProject = (props) => {

    const projects = useSelector(state => state.projects);

    const renderOptions = () => {
        return projects.map((item, i) => {
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