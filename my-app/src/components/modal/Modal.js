import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './modal.css';

const Modal = (props) => {

    let history = useHistory();
    let { id } = useParams(); // object id. Get the data from the redux store

    let back = e => {
        history.goBack();
    }

    const children = React.Children.map(props.children, (child, index) => {
        return React.cloneElement(child, {
            // index,
            // isActive: index === this.state.activeIndex,
            close: () => back()
        });
    });


    return (
        <div
            className="modal-background"
        // onClick={back}
        >
            <div className='modal-container'>
                {children}
            </div>
        </div>
    )
}

export default Modal;