import React from 'react';
import './progressBar.css';

function ProgressBar(props) {
    return (
        <div className="progressBar">
            <div className="d-flex flex-row-reverse">
                <p className="progress-number">{props.progress}%</p>
            </div>
            <div className="progressBar-background"></div>
            <div 
                className={"progressBar-progress progressColor-" + props.type}
                style={{ width : props.progress + "%" }}>    
            </div>
        </div>
    )
};

export default ProgressBar;