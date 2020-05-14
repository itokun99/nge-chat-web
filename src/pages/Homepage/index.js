import { React, Link, useHistory, connect, PropTypes } from 'libraries';
import { BaseContainer } from 'containers';
import { Button } from 'components';
import { showPopup } from 'services';
import { profileSelector } from 'modules';

const Homepage = ({ profile }) => {
  const history = useHistory();

  React.useEffect(() => {
    if (profile) {
      history.replace('/dashboard/');
    }
  }, [history, profile]);

  return (
    <BaseContainer disableHeader>
      <div className="Homepage">
        <div className="Homepage__content">
          <h1 className="Homepage__title">Nge-Chat</h1>
          <div className="Homepage__description">
            Nge-Chat adalah aplikasi berbalas pesan yang simpel, dan open source
          </div>
          <Link to="/login">Coba Sekarang!</Link>
        </div>
      </div>
    </BaseContainer>
  );
};

Homepage.propTypes = {
  profile: PropTypes.object
};

Homepage.defaultProps = {
  profile: null
};

const reduxState = state => ({
  profile: profileSelector(state)
});

export default connect(reduxState)(Homepage);
