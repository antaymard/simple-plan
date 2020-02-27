import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './resourcesList.css';

const ResourcesList = (props) => {

    const [resources, setResources] = useState([]);
    const [isEdit, setIsEdit] = useState([]);

    useEffect(() => {
        console.log(props.resourcesArray)
        // setResources(props.resources);
        // setIsEdit(() => props.resources.map(i => false));
    }, [])

    // Array containing every service's logo using clearbit.com/logo

    const onChange = (e, id) => {
        let val = e.target.value;
        let na = e.target.name;
        let _resources = props.resources.map((item, i) => {
            if (i === id) {
                return { ...item, [e.target.name]: e.target.value }
            }
            else return item
        });
        setResources(_resources);
    };

    const addItem = () => {
        if (resources[resources.length - 1].name === "") {
            setIsEdit({ ...isEdit, [isEdit.length - 1]: true });
        } else {
            // add a state
            let _isEdit = [...isEdit];
            _isEdit.push(true);
            console.log(_isEdit)
            setIsEdit(_isEdit)

            // add an item
            let _resources = [...resources];
            _resources.push({
                name: "",
                url: '',
                service: "",
                isFavorite: false
            });
            setResources(_resources);
        }
    };

    const turnToEdit = (id) => {
        let _isEdit = [...isEdit];
        _isEdit[id] = !_isEdit[id];
        setIsEdit(_isEdit);
    };

    const onSubmit = () => {
        // Should send back the array of resources
        props.sendChange(resources);
    };

    const renderList = () => {
        // Render resource Item list
        return resources.map((item, i) => {
            return (

                // This is a resource Item
                <div className="resources-item">
                    <div className="d-flex flex-row">
                        <img src="https://logo.clearbit.com/figma.com" />
                        <div className="resources-item-text">
                            {isEdit[i] ? <input name='name' placeholder="Nom" onChange={e => onChange(e, i)} value={item.name} /> : <Link to={item.url} target='_blank'><h4> {item.name}</h4></Link>}
                            {isEdit[i] ? <input name='url' placeholder="url" onChange={onChange} value={item.url} /> : <Link to={item.url} target='_blank'><p>{item.url}</p></Link>}
                        </div>
                    </div>
                    <button onClick={() => turnToEdit(i)}>...</button>
                </div >
            )
        })
    };

    const updateResourcesArray = (d, id) => {
        console.log("THIS IS UPDATE RES");
        console.log(d);

        let _a = resources.map((item, i) => {
            if (i === id) {
                return d
            }
            else return item
        });
        // Send the data to parent => jobEdit.js
        props.getChange(_a);
    };

    return (
        <div className="resources-section">
            {console.log(props)}
            <div className='resources-content'>
                {renderList()}
            </div>
            <div className="resources-footer">
                <div className='d-flex flex-row'>
                    Ouvrir tout
                </div>
                <button onClick={addItem}>
                    Add new
                </button>
            </div>
        </div>
    )
}

export default ResourcesList;