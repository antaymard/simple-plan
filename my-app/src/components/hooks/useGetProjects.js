import axios from "axios";
import queryString from 'query-string';
import { useStore } from 'react-hookstore';

const useGetProjects = () => {

  const [ projectsList, setProjectsList ] = useStore('projectsListStore');

  function getProjects() {
    console.log('useGetJobs fired');
    axios.get('/api/projects')
        .then(res => {
            setProjectsList(res.data);
        })
  }

  return {
    projectsList,
    getProjects,
  }
};

export default useGetProjects;