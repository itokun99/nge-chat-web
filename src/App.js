import {
  React,
  BrowserRouter as Router,
  Route,
  AnimatedSwitch,
  spring,
  connect,
  PropTypes
} from 'libraries';
import { AppContainer } from 'containers';
import { LoadingScreen } from 'components';
import { appRoutes } from 'routes';
import { profileSelector } from 'modules';
import { getProfile } from 'services';

function glide(val) {
  return spring(val, {
    stiffness: 174,
    damping: 24
  });
}

const pageTransitions = {
  atEnter: {
    opacity: 0,
    offset: 100
  },
  atLeave: {
    opacity: 0,
    offset: glide(-100)
  },
  atActive: {
    opacity: 1,
    offset: glide(0)
  }
};

const App = ({ profile }) => {
  const [appLoading, setAppLoading] = React.useState(true);

  React.useEffect(() => {
    const init = async () => {
      await getProfile();
      setAppLoading(false);
    };
    init();
  }, []);

  return (
    <Router>
      <AppContainer>
        {!appLoading && (
          <AnimatedSwitch
            {...pageTransitions}
            className="switch-wrapper"
            mapStyles={styles => ({
              opacity: styles.opacity,
              transform: `translateX(${styles.offset}%)`
            })}
          >
            {appRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={routeProps => (
                  <React.Fragment>
                    <route.component {...routeProps} />
                  </React.Fragment>
                )}
              />
            ))}
          </AnimatedSwitch>
        )}
        <LoadingScreen show={appLoading} />
      </AppContainer>
    </Router>
  );
};

const reduxState = state => ({
  profile: profileSelector(state)
});

App.propTypes = {
  profile: PropTypes.object
};

App.defaultProps = {
  profile: null
};

export default connect(reduxState)(App);
