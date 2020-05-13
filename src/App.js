import {
  React,
  BrowserRouter as Router,
  Route,
  AnimatedSwitch,
  spring,
  Redirect
} from 'libraries';
import { Container } from 'components';
import { appRoutes } from 'routes';
import { firebaseService } from 'modules';

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
  const [isLogin, setLogin] = React.useState(false);

  React.useEffect(() => {
    firebaseService.auth().onAuthStateChanged(user => {
      console.log('user', user);
      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    });
  }, []);

  return (
    <Router>
      <Container>
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
      </Container>
    </Router>
  );
};

export default App;
