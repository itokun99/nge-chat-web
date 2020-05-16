import { React, PropTypes, connect, useHistory } from 'libraries';
import { profileSelector } from 'modules';

const PrivateContainer = ({ profile, children }) => {
  const history = useHistory();

  React.useEffect(() => {
    if (!profile) {
      history.replace('/');
    }
  }, [history, profile]);

  return <React.Fragment>{children}</React.Fragment>;
};

const reduxState = state => ({
  profile: profileSelector(state)
});

PrivateContainer.propTypes = {
  children: PropTypes.any,
  profile: PropTypes.object
};

PrivateContainer.defaultProps = {
  profile: null
};

export default connect(reduxState)(PrivateContainer);
