import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const JobsSubheader = () => {

    let location = useLocation();

    useEffect(() => {
        // on init, get project infos

    }, [])

    // return (
    //     <div className="jobs-subheader">
    //         <div className="header">
    //             <h3>In progress</h3>
    //         </div>
    //         <div className='body'>
    //             In progress...
    //             </div>
    //         <div className="footer">
    //             <div></div>
    //             <Link
    //                 className="addJob-button"
    //                 to={{
    //                     pathname: "/dashboard/j/new",
    //                     state: { background: location }
    //                 }}>
    //                 + NEW JOB
    //             </Link>
    //         </div>
    //     </div>
    // )

    return (
        <Link
            className="addJob-button"
            to={{
                pathname: "/dashboard/j/new",
                state: { background: location }
            }}>
            + NEW JOB
        </Link>
    )
}

export default JobsSubheader;