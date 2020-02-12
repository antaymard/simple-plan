import React, { useState, useEffect } from 'react';
import JobsContainer from '../components/jobsContainer/JobsContainer.js';
import Calendar from 'react-calendar';
import ProjectsContainer from '../components/projectsContainer/ProjectsContainer.js';
import { Link, useParams } from 'react-router-dom';
import moment from "moment";
import queryString from 'query-string';

const DashboardPage = () => {

    const [query, setQuery] = useState({});
    const match = useParams();

    // check https://developer.mozilla.org/fr/docs/Web/API/URLSearchParams

    // Turn into hoook
    useEffect(() => {
        console.log("update query");
        console.log(match);
        // console.log(window.location.query)
        // setQuery(queryString.parse(window.location.query));
        // console.log(query)
    }, [window.location.search])

    const createLink = (action) => {
        // if (query.weekNumber) {

        // } else {

        // }

        // return toUrl;
    }

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
                    <Link to="/">
                        <h1>Dashboard</h1>
                    </Link>
                    <h2>
                        <Link to={'/?' + queryString.stringify({
                            ...query, weekNumber: moment().format('W')
                        })}>
                            Semaine {moment().format('W')}
                        </Link>
                        <Link to='/'>
                            🡠
                        </Link>
                        <Link to='/'>
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