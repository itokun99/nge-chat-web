import { React, MdArrowBack, MdClose, PropTypes, cx } from 'libraries';

const AppHeader = ({
  onPressLeft,
  onPressRight,
  title,
  disableLeftAction,
  disableRightAction,
  transparent,
  theme
}) => {
  const appHeaderClass = cx('AppHeader', {
    [`AppHeader--transparent`]: transparent,
    [`AppHeader--${theme}`]: theme
  });

  return (
    <div className={appHeaderClass}>
      {!disableLeftAction && (
        <div className="AppHeader__left">
          <MdArrowBack size={32} onClick={onPressLeft} />
        </div>
      )}
      <div className="AppHeader__center">
        <span className="AppHeader__title">{title}</span>
      </div>
      {!disableRightAction && (
        <div className="AppHeader__right">
          <MdClose size={32} onClick={onPressRight} />
        </div>
      )}
    </div>
  );
};

AppHeader.propTypes = {
  disableLeftAction: PropTypes.bool,
  disableRightAction: PropTypes.bool,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  title: PropTypes.string,
  transparent: PropTypes.bool,
  theme: PropTypes.oneOf(['dark', 'light'])
};

AppHeader.defaultProps = {
  title: '',
  theme: 'dark',
  transparent: false,
  disableLeftAction: false,
  disableRightAction: false,
  onPressLeft: () => {},
  onPressRight: () => {}
};

export default AppHeader;
