import axios from "axios";
import queryString from 'query-string';
import { useStore } from 'react-hookstore';

const useGetJobs = () => {

  const [filter, setFilter] = useStore('jobFilterStore');
  const [jobsList, setJobsList] = useStore('jobsListStore');

  function getJobs() {
    console.log('useGetJobs fired');
    console.log(filter)
    console.log(queryString.stringify(filter, localStorage.getItem('token')));
    axios.get('/api/jobs?' + queryString.stringify(filter), {
      headers: {
        "x-access-token": localStorage.getItem('token')
      }
    })
      .then(res => {
        setJobsList(res.data);
        console.log(res.data)
      })
  }

  return {
    jobsList,
    getJobs,
  }
};

export default useGetJobs;