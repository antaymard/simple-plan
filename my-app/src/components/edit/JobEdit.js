import React from 'react';
import './edit.css';

import Type from '../type/Type.js';

const JobEdit = () => {



    return (
        <div className="editPanel=container">
            <div className="editPanel=header">
                <div>
                    <Type type="learn" selected />
                    <Type type="build" selected />
                    <Type type="todo" selected />
                    <Type type="check" selected />
                </div>
                <button onClick={closePanel}>
                    X
                </button>
            </div>
            <div className="row editPanel-content">
                <div className="col-8 editPanel-left">
                    <h1>Apprendre React</h1>
                </div>
                <input>
                </input>
                <div className="col-4 editPanel-right">

                </div>
            </div>
        </div>
    )
}