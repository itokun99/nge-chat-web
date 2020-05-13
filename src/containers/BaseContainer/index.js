import { React, PropTypes, cx } from 'libraries';
import { AppHeader } from 'components';

const BaseContainer = ({
  onPressLeft,
  onPressRight,
  title,
  children,
  disableHeader,
  disableLeftAction,
  disableRightAction,
  headerProps
}) => {
  const baseContainerClass = cx('BaseContainer', {
    [`BaseContainer--no-header`]: disableHeader
  });

  return (
    <div className={baseContainerClass}>
      {!disableHeader && (
        <div className="BaseContainer__header">
          <AppHeader
            disableLeftAction={disableLeftAction}
            disableRightAction={disableRightAction}
            title={title}
            onPressLeft={onPressLeft}
            onPressRight={onPressRight}
            {...headerProps}
          />
        </div>
      )}
      <div className="BaseContainer__body">{children}</div>
    </div>
  );
};

BaseContainer.propTypes = {
  headerProps: PropTypes.object,
  title: PropTypes.string,
  disableHeader: PropTypes.bool,
  children: PropTypes.any,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  disableLeftAction: PropTypes.bool,
  disableRightAction: PropTypes.bool
};

BaseContainer.defaultProps = {
  disableHeader: false
};

export default BaseContainer;
