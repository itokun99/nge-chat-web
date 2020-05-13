import { React, useMemo, PropTypes } from 'libraries';

const Container = ({ children }) =>
  useMemo(() => <div className="Container">{children}</div>, [children]);

Container.propTypes = {
  children: PropTypes.any
};

Container.defaultProps = {
  children: null
};

export default Container;
