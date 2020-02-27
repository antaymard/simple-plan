import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import moment from "moment";
import '../myCalendar.css';

// import queryString from 'query-string';
import ProjectsContainer from '../components/projectsContainer/ProjectsContainer.js';
import JobsContainer from '../components/jobsContainer/JobsContainer.js';
// import JobsSubheader from '../components/jobsContainer/JobsSubheader.js';

const DashboardPage = (props) => {

    const location = useLocation();
    const [weekNumber, setWeeknumber] = useState(Number(moment().format('W')));
    const [selectedProjectId, setSelectedProjectId] = useState();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get('weekNumber')) {
            setWeeknumber(Number(searchParams.get("weekNumber")))
        }

        let id = location.pathname;
        id = id.split('/');
        let index = id.indexOf('p');
        id = id[index + 1];
        if (id) {
            setSelectedProjectId(id);
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
                    <div className="viewport-right-header">
                        <div className="d-flex flex-column">
                            <Link to={'/dashboard'}>
                                <h1>Dashboard</h1>
                            </Link>
                            <h2>
                                <Link to={"?weekNumber=" + moment().format("W")} >
                                    Semaine {weekNumber}
                                </Link>
                                <Link to={"?weekNumber=" + (weekNumber - 1)}>
                                    🡠
                        </Link>
                                <Link to={"?weekNumber=" + (weekNumber + 1)}>
                                    🡢
                        </Link>
                            </h2>
                        </div>
                        {selectedProjectId ? null :
                            <Link
                                key={1}
                                id="add-job-button"
                                to={{
                                    pathname: "/dashboard/j/new",
                                    state: { background: location }
                                }}>
                                + new job
                        </Link>
                        }
                    </div>
                    <JobsContainer />
                </div>
            </div>
        </>
    )
}

export default DashboardPage;