import { React, PropTypes, connect, useHistory } from 'libraries';
import { profileSelector } from 'modules';

const AuthContainer = ({ profile, children }) => {
  const history = useHistory();

  React.useEffect(() => {
    if (profile) {
      history.replace('/dashboard');
    }
  }, [history, profile]);

  return <React.Fragment>{children}</React.Fragment>;
};

const reduxState = state => ({
  profile: profileSelector(state)
});

AuthContainer.propTypes = {
  children: PropTypes.any,
  profile: PropTypes.object
};

AuthContainer.defaultProps = {
  profile: null
};

export default connect(reduxState)(AuthContainer);
