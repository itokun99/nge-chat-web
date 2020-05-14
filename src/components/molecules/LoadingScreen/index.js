import { React, PropTypes, cx, useMemo } from 'libraries';

const LoadingScreen = ({ show }) =>
  useMemo(() => {
    const className = cx('LoadingScreen', {
      'LoadingScreen--show': show
    });
    return (
      <div className={className}>
        <h1 className="Loading__title">Loading</h1>
      </div>
    );
  }, [show]);

LoadingScreen.propTypes = {
  show: PropTypes.bool
};

LoadingScreen.defaultProps = {
  show: false
};

export default LoadingScreen;
