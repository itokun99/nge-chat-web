import {
  React,
  BrowserRouter as Router,
  Route,
  AnimatedSwitch,
  spring
} from 'libraries';
import { AppContainer } from 'containers';
import { LoadingScreen } from 'components';
import { appRoutes } from 'routes';
import { getProfile, showPopup } from 'services';

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

const App = () => {
  const [appLoading, setAppLoading] = React.useState(true);

  React.useEffect(() => {
    const init = async () => {
      try {
        await getProfile();
      } catch (err) {
        showPopup({
          title: 'Terjadi Kesalahan!',
          description: err.message
        });
      }

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

export default App;
