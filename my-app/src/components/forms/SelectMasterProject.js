import React, { useEffect, useState } from 'react';
import { useStore } from 'react-hookstore';
import axios from 'axios';

const SelectMasterProject = (props) => {

    const [ projectList, setProjectList ] = useState([]);
    const [ filter, setFilter ] = useStore('jobFilterStore');
    var selected = "";

    useEffect(() => {
        axios.get('/api/projects')
        .then(res => {
            console.log(res.data);
            setProjectList(res.data);
        })
        .catch(err => console.log(err))
    }, [])

    // useEffect(() => {
    //     if (filter.projectId) {
    //         let e = {
    //             target : {
    //                 value : filter.projectId
    //             }
    //         }
    //         props.change(e);
    //         selected = filter.projectId;
    //     } else {
    //         selected = props.selected;
    //     }
    // })

    const renderOptions = () => {
        return projectList.map((item, i) => {
        return <option key={i} value={item._id}>{item.name}</option>
        })
    }

    return (
        <>
            <select name="pets" id="pet-select" onChange={props.change}>
                <option value="">Sélectionner un projet</option>
                {renderOptions()}
            </select>
        </>
    )
}

export default SelectMasterProject;