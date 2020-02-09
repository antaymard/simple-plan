// TO KILL

import { useStore } from 'react-hookstore';

const useGetProjects = () => {

  const [projectsList, setProjectsList] = useStore('projectsListStore');

  function getProjects() {
    console.log('useGetJobs fired');
  }

  return {
    projectsList,
    getProjects,
  }
};

export default useGetProjects;