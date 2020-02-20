import React from 'react';

import './type.css';

function Type(props) {

    return (
        <div className={"job-type typeColor-" + props.selected + '-' + props.type + ' ' + (props.size || null)}>
            {props.type.toUpperCase()}
        </div>
    )
};

export default Type;