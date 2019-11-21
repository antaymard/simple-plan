import { useState } from 'react';
import axios from "axios";
import queryString from 'query-string';
import { useStore } from 'react-hookstore';

const useGetJobs = () => {

  // const [ jobsList, setJobsList ] = useState([]);
  const [ filter, setFilter ] = useStore('jobFilterStore');
  const [ jobsList, setJobsList ] = useStore('jobsListStore');

  function getJobs() {
    console.log('useGetJobs fired');
    axios.get('/api/jobs?' + queryString.stringify( filter ))
        .then(res => {
            setJobsList(res.data);
        })
  }

  return {
    jobsList,
    getJobs,
  }
};

export default useGetJobs;