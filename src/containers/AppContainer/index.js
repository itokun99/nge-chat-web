import { React, PropTypes } from 'libraries';
import { Popup } from 'components';

const AppContainer = ({ children }) => (
  <div className="AppContainer">
    <>{children}</>
    <Popup />
  </div>
);

AppContainer.propTypes = {
  children: PropTypes.any
};

export default AppContainer;
