import { React, Route, Redirect, PropTypes } from 'libraries';

const AppRoute = ({
  privateRoute,
  authenticated,
  component: Component,
  route
}) => {
  if (privateRoute) {
    return (
      <Route
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={routeProps =>
          authenticated ? <Component {...routeProps} /> : <Redirect to="/" />
        }
      />
    );
  }

  return (
    <Route
      path={route.path}
      exact={route.exact}
      name={route.name}
      render={routeProps => <Component {...routeProps} />}
    />
  );
};

AppRoute.propTypes = {
  authenticated: PropTypes.bool,
  route: PropTypes.object.isRequired,
  component: PropTypes.any,
  privateRoute: PropTypes.bool
};

AppRoute.defaultProps = {
  authenticated: false,
  privateRoute: false,
  component: null
};

export default AppRoute;
