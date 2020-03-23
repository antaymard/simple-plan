import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import moment from "moment";
import { ObjectId } from 'bson';

import '../myCalendar.css';

// import queryString from 'query-string';
import ProjectsContainer from '../components/projectsContainer/ProjectsContainer.js';
import JobsContainer from '../components/jobsContainer/JobsContainer.js';
// import JobsSubheader from '../components/jobsContainer/JobsSubheader.js';

const DashboardPage = (props) => {

    const location = useLocation();
    const [weekNumber, setWeeknumber] = useState(Number(moment().format('W')));
    const [dayNumber, setDayNumber] = useState(Number(moment().isoWeekday() - 1))
    const [selectedProjectId, setSelectedProjectId] = useState();

    let dayList = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get('weekNumber')) {
            setWeeknumber(Number(searchParams.get("weekNumber")));
        }
        if (searchParams.get('dayNumber')) {
            setDayNumber(Number(searchParams.get('dayNumber')));
            console.log("there is");
            console.log(dayList[dayNumber - 1])
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
                            <div className="time-selector-section">
                                <Link to={"?weekNumber=" + (weekNumber - 1)}>
                                    🡠
                                </Link>
                                <Link to={"?weekNumber=" + moment().format("W")} >
                                    Semaine {weekNumber}
                                </Link>
                                <Link to={"?weekNumber=" + (weekNumber + 1)}>
                                    🡢
                                </Link>
                                {/* <Link to={"?dayNumber=" + (dayNumber - 1)} style={{ marginLeft: "20px" }}>
                                    🡠
                                </Link>
                                <Link to={"?dayNumber=" + Number(moment().isoWeekday() - 1)} >
                                    {dayList[dayNumber]}
                                </Link>
                                <Link to={"?dayNumber=" + (dayNumber + 1)}>
                                    🡢
                                </Link> */}
                            </div>
                        </div>
                        {selectedProjectId ? null :
                            <Link
                                key={1}
                                id="add-job-button"
                                to={{
                                    pathname: "/dashboard/j/" + new ObjectId().toString(),
                                    state: { background: location, isJobCreation: true }
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