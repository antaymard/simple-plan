import React, { useEffect, useState } from 'react';
import JobsContainer from '../components/jobsContainer/JobsContainer.js';
import Calendar from 'react-calendar';
import ProjectsContainer from '../components/projectsContainer/ProjectsContainer.js';
import { Link } from 'react-router-dom';
import moment from "moment";

import useQuery from '../components/hooks/useQuery';

const DashboardPage = () => {

    const queryParams = useQuery();
    const [weekNumber, setWeekNumber] = useState(queryParams.get("weekNumber") || moment().format('W'));

    // check https://developer.mozilla.org/fr/docs/Web/API/URLSearchParams

    useEffect(() => {
        console.log("changing");
        console.log(weekNumber)
        setWeekNumber(queryParams.get("weekNumber"));
    }, [window.location.search])

    const updateQuery = (key, newValue) => {
        queryParams.set(key, newValue);
        let newQueryString = queryParams.toString();

        return newQueryString;
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
                        <Link to={"/?" + updateQuery('weekNumber', moment().format("W"))} >
                            Semaine {moment().format('W')}
                        </Link>
                        <Link to={"/?" + updateQuery('weekNumber', weekNumber - 1)}>
                            🡠
                        </Link>
                        <Link to={"/?" + updateQuery('weekNumber', Number(weekNumber) + 1)}>
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