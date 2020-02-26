import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './resourcesList.css';


const ResourcesList = (props) => {

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
    ]


    const [editPopupIsOpen, setEditPopupIsOpen] = useState(true);

    const renderList = (parent) => {
        // Render project resources or job resources
        return resources.map((item, i) => {
            return (
                <div className="resources-item">
                    <div>
                        {/* img */}
                        <div className="resources-item-text">
                            <Link to={item.url} target='_blank'>
                                <h4>{item.name}</h4>
                                <p>{item.url}</p>
                            </Link>
                        </div>
                    </div>
                    <button onClick={() => setEditPopupIsOpen(!editPopupIsOpen)}>
                        ...
                    </button>
                    {
                        editPopupIsOpen ? (
                            <div className="resources-item-edit-popup">
                                LOLILOL
                            </div>
                        ) : null
                    }
                </div>
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

export default ResourcesList;