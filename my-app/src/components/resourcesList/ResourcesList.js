import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './resourcesList.css';

let resources = [
    {
        isFavorite: false,
        url: "www.google.com",
        name: "Notes du projet",
        service: "notion"
    },
    {
        isFavorite: true,
        url: "www.pubmed.com",
        name: "Publication IA",
        service: "other"
    },
    {
        isFavorite: false,
        url: "www.figma.com",
        name: "Design",
        service: "figma"
    }
];
let logoArray = [
    'https://logo.clearbit.com/amenitiz.io',
    "https://logo.clearbit.com/notion.so",
    'https://logo.clearbit.com/figma.com',
    "https://logo.clearbit.com/gdrivedl.xyz"
];

const ResourcesList = (props) => {


    // Array containing every service's logo using clearbit.com/logo

    const renderList = (parent) => {
        // Render project resources or job resources
        return resources.map((item, i) => {
            return (
                <ResourceItem item={item}/>
            )
        })
    }

    return (
        <div className="resources-section">
            <div className='resources-content'>
                {renderList()}
            </div>
            <div className="resources-footer">
                <div className='d-flex flex-row'>
                    Ouvrir tout
                </div>
                <button>
                    Add new
                </button>
            </div>
        </div>
    )
}

// Individual item
const ResourceItem = (props) => {

    const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);

    return (
        <div className="resources-item">
                    <div className="d-flex flex-row">
                        <img src={logoArray[1]}/>
                        <div className="resources-item-text">
                            <Link to={props.item.url} target='_blank'>
                                <h4>{props.item.name}</h4>
                                <p>{props.item.url}</p>
                            </Link>
                        </div>
                    </div>
                    <button onClick={() => setEditPopupIsOpen(!editPopupIsOpen)}>
                        ...
                    </button>
                    {
                        editPopupIsOpen ? (
                            <EditPopup/>
                        ) : null
                    }
        </div>
    )
}

// Edit panel
const EditPopup = () => {

    return (
        <div className="resources-item-edit-popup">
           LOLILOL
        </div>
    )
}

export default ResourcesList;