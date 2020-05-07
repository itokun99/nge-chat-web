import { Homepage, About } from "pages";

const appRoutes = [
  {
    name: "About",
    component: About,
    exact: true,
    path: "/about"
  },
  {
    name: "Homepage",
    component: Homepage,
    exact: true,
    path: "/"
  }
];

export default appRoutes;
