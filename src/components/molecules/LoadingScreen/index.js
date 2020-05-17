import { React, PropTypes, cx, useMemo } from 'libraries';

const LoadingScreen = ({ show }) =>
  useMemo(() => {
    const className = cx('LoadingScreen', {
      'LoadingScreen--show': show,
      'LoadingScreen--animate': show
    });
    return (
      <div className={className}>
        <h1 className="LoadingScreen__title">Nge-Chat</h1>
      </div>
    );
  }, [show]);

LoadingScreen.propTypes = {
  show: PropTypes.bool
};

LoadingScreen.defaultProps = {
  show: true
};

export default LoadingScreen;
