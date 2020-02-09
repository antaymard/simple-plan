import React from 'react';
import JobsContainer from '../components/jobsContainer/JobsContainer.js';
import Calendar from 'react-calendar';
import ProjectsContainer from '../components/projectsContainer/ProjectsContainer.js';
import { Link } from 'react-router-dom';


const DashboardPage = () => {
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
                    <h2>Semaine 6</h2>
                    <JobsContainer />
                </div>
            </div>
        </>
    )
}

export default DashboardPage;