import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './modal.css';

const Modal = (props) => {

    let history = useHistory();
    let { id } = useParams(); // object id. Get the data from the redux store

    let back = e => {
        e.stopPropagation();
        history.goBack();
    }

    return (
        <div
            className="modal-background"
        // onClick={back}
        >
            <div className='modal-container'>
                {props.children}
            </div>
        </div>
    )
}

export default Modal;