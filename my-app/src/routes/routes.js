// FILE TO REMOVE

import DashboardPage from '../pages/DashboardPage.js';
import MyProjectsPage from '../pages/MyProjectsPage';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    exact: true,
    component: DashboardPage
  },
  {
    path: "/edit",
    component: MyProjectsPage
  },
  // {
  //   path: '/my-projects',
  //   name: 'My Projects',
  //   component: MyProjectsPage,
  // },
];

export default routes;