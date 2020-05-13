import { Homepage, About, Login, Register } from 'pages';

const appRoutes = [
  {
    name: 'About',
    component: About,
    exact: true,
    path: '/about'
  },
  {
    name: 'Register',
    component: Register,
    exact: true,
    path: '/register'
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
