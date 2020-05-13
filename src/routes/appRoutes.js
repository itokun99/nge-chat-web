import { Homepage, About, Login } from 'pages';

const appRoutes = [
  {
    name: 'About',
    component: About,
    exact: true,
    path: '/about'
  },
  {
    name: 'Login',
    component: Login,
    exact: true,
    path: '/login'
  },
  {
    name: 'Homepage',
    component: Homepage,
    exact: true,
    path: '/'
  }
];

export default appRoutes;
