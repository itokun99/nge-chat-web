import { Homepage, About, Login, Register, Dashboard, Setting } from 'pages';

const appRoutes = [
  {
    name: 'About',
    component: About,
    exact: true,
    path: '/about',
    auth: false
  },
  {
    name: 'Setting',
    component: Setting,
    exact: true,
    path: '/setting',
    auth: true
  },
  {
    name: 'Dashboard',
    component: Dashboard,
    exact: true,
    path: '/dashboard',
    auth: true
  },
  {
    name: 'Register',
    component: Register,
    exact: true,
    path: '/register',
    auth: false
  },
  {
    name: 'Login',
    component: Login,
    exact: true,
    path: '/login',
    auth: false
  },
  {
    name: 'Homepage',
    component: Homepage,
    exact: true,
    path: '/',
    auth: false
  }
];

export default appRoutes;
