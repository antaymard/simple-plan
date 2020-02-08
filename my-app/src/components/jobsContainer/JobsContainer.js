import React, { useEffect} from 'react';
import { useStore } from 'react-hookstore';

import './jobsContainer.css';

import Job from '../job/Job.js';
import useGetJobs from '../hooks/useGetJobs.js';
import JobsSubheader from './JobsSubheader.js';

const JobsContainer = () => {

    const { _jobsList, getJobs } = useGetJobs();
    const [ jobsList, setJobsList ] = useStore('jobsListStore');
    const [ filter, setFilter ] = useStore('jobFilterStore');

    useEffect(() => {
        console.log('useEffect omg')
        getJobs();
    }, [ filter ])

    const renderJobsList = () => {
        return jobsList.map(function(item, i){
            return <Job key={i} data={jobsList[i]}/>
        })
    }

    return (
        <>
            <div className="subHeader">
                <JobsSubheader/>
            </div>
            <div className='row jobsList-section'>
                {renderJobsList()}
            </div>
        </>
    )
};

export default JobsContainer;