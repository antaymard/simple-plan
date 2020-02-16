import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Link, useRouteMatch, useLocation, BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';
import moment from "moment";

// import queryString from 'query-string';
import useQueryString from '../components/hooks/useQueryString';
import ProjectsContainer from '../components/projectsContainer/ProjectsContainer.js';
import Edit from '../components/edit/JobEdit.js';
import JobsContainer from '../components/jobsContainer/JobsContainer.js';

const DashboardPage = (props) => {

    let { path, url } = useRouteMatch();
    const location = useLocation();
    const [weekNumber, setWeeknumber] = useState(Number(moment().format('W')));

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get('weekNumber')) {
            setWeeknumber(Number(searchParams.get("weekNumber")))
        }
    }, [location])

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
                    <Link to={'/dashboard/p'}>
                        <h1>Dashboard</h1>
                    </Link>
                    <h2>
                        <Link to={url + "?weekNumber=" + moment().format("W")} >
                            Semaine {weekNumber}
                        </Link>
                        <Link to={url + "?weekNumber=" + (weekNumber - 1)}>
                            🡠
                        </Link>
                        <Link to={url + "?weekNumber=" + (weekNumber + 1)}>
                            🡢
                        </Link>
                    </h2>
                    <Switch>
                        {/* <Route path="/j/:id">
                            <Edit />
                        </Route>
                        <Route path="/j">
                            <Edit />
                        </Route> */}
                        <Route path="">
                            <JobsContainer />
                        </Route>
                    </Switch>
                </div>
            </div>
        </>
    )
}

export default DashboardPage;