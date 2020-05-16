/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { React, MdArrowBack, MdClose, PropTypes, cx } from 'libraries';

const AppHeader = ({
  onPressLeft,
  onPressRight,
  title,
  disableLeftAction,
  disableRightAction,
  transparent,
  theme,
  leftComponent,
  rightComponent
}) => {
  const appHeaderClass = cx('AppHeader', {
    [`AppHeader--transparent`]: transparent,
    [`AppHeader--${theme}`]: theme
  });

  return (
    <div className={appHeaderClass}>
      {!disableLeftAction && (
        <div className="AppHeader__left">
          {leftComponent ? (
            <React.Fragment>
              <span onClick={onPressLeft}>{leftComponent}</span>
            </React.Fragment>
          ) : (
            <MdArrowBack size={32} onClick={onPressLeft} />
          )}
        </div>
      )}
      <div className="AppHeader__center">
        <span className="AppHeader__title">{title}</span>
      </div>
      {!disableRightAction && (
        <div className="AppHeader__right">
          {rightComponent ? (
            <React.Fragment>
              <span onClick={onPressRight}>{rightComponent}</span>
            </React.Fragment>
          ) : (
            <MdClose size={32} onClick={onPressRight} />
          )}
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
  leftComponent: PropTypes.any,
  rightComponent: PropTypes.any,
  theme: PropTypes.oneOf(['dark', 'light'])
};

AppHeader.defaultProps = {
  title: '',
  theme: 'dark',
  transparent: false,
  disableLeftAction: false,
  disableRightAction: false,
  leftComponent: null,
  rightComponent: null,
  onPressLeft: () => {},
  onPressRight: () => {}
};

export default AppHeader;
