import { React, useMemo, PropTypes, cx } from 'libraries';

const Container = ({ children, noPadding }) =>
  useMemo(() => {
    const className = cx('Container', {
      'Container--no-padding': noPadding
    });

    return <div className={className}>{children}</div>;
  }, [children, noPadding]);

Container.propTypes = {
  noPadding: PropTypes.bool,
  children: PropTypes.any
};

Container.defaultProps = {
  children: null,
  noPadding: false
};

export default Container;
