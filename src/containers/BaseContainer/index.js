import { React, PropTypes, cx, MdMenu } from 'libraries';
import { AppHeader, Sidebar } from 'components';

const BaseContainer = ({
  onPressLeft,
  onPressRight,
  title,
  children,
  disableHeader,
  disableLeftAction,
  disableRightAction,
  headerProps,
  sidebar
}) => {
  const [showSidebar, visibleSidebar] = React.useState(false);

  const onSidebarDropClick = () => {
    visibleSidebar(false);
  };

  const handlePressLeft = () => {
    if (sidebar) {
      visibleSidebar(true);
    }
    onPressLeft();
  };

  const baseContainerClass = cx('BaseContainer', {
    [`BaseContainer--no-header`]: disableHeader
  });

  return (
    <div className={baseContainerClass}>
      {sidebar && (
        <Sidebar show={showSidebar} onDropClick={onSidebarDropClick} />
      )}
      {!disableHeader && (
        <div className="BaseContainer__header">
          <AppHeader
            disableLeftAction={disableLeftAction}
            disableRightAction={disableRightAction}
            title={title}
            onPressLeft={handlePressLeft}
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
  disableRightAction: PropTypes.bool,
  rightComponent: PropTypes.any,
  leftComponent: PropTypes.any,
  sidebar: PropTypes.bool
};

BaseContainer.defaultProps = {
  disableHeader: false,
  sidebar: true,
  onPressLeft: () => {},
  onPressRight: () => {}
};

export default BaseContainer;
