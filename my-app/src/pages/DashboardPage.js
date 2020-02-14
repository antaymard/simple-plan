import React, { useEffect } from 'react';
import JobsContainer from '../components/jobsContainer/JobsContainer.js';
import Calendar from 'react-calendar';
import ProjectsContainer from '../components/projectsContainer/ProjectsContainer.js';
import { Link, useRouteMatch } from 'react-router-dom';
import moment from "moment";

// import queryString from 'query-string';
import useQueryString from '../components/hooks/useQueryString';


const DashboardPage = (props) => {

    // const [value, onSetValue] = useQueryString(7);
    let { path } = useRouteMatch();

    useEffect(() => {
        // onSetValue("ptdr")
    }, [])

    // const updateQuery = () => {
    //     let params = queryString.parse(props.location.search);
    //     return params;
    // }

    return (
        <>
            <div className="row viewport">
                <div className='col-2 viewport-left fullHeight'>
                    <Calendar
                        value={new Date()}
                        formatShortWeekday={(locale, value) => ['D', 'L', 'M', 'M', 'J', 'V', 'S'][value.getDay()]}
                        formatMonth={(local, value) => ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'][value.getMonth()]}
                        next2Label={null}
                        prev2Label={null}
                        showWeekNumbers
                    />
                    <ProjectsContainer />
                </div>
                <div className='col-10 viewport-right fullHeight'>
                    <Link to={path}>
                        <h1>Dashboard</h1>
                    </Link>
                    <h2>
                        <Link to={path + "?weekNumber=" + moment().format("W")} >
                            Semaine {moment().format('W')}
                        </Link>
                        <Link to={path}>
                            🡠
                        </Link>
                        <Link to={path}>
                            🡢
                        </Link>
                    </h2>
                    <JobsContainer />
                </div>
            </div>
        </>
    )
}

export default DashboardPage;