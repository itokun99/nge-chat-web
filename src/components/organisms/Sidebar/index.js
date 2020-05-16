/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { React, PropTypes, cx, useState } from 'libraries';
import { ProfileSidebar } from 'components/molecules';

const Sidebar = ({ show, onHide, onVisible, onDropClick }) => {
  const [visible, changeVisible] = useState(false);

  const sidebarClass = cx('Sidebar', {
    'Sidebar--show': visible
  });

  const dropClass = cx('SidebarDrop', {
    'SidebarDrop--show': visible
  });

  const showSidebar = React.useCallback(() => {
    onVisible();
    changeVisible(true);
  }, [onVisible]);

  const hideSidebar = React.useCallback(() => {
    onHide();
    changeVisible(false);
  }, [onHide]);

  const handleDrop = () => {
    onDropClick();
    hideSidebar();
  };

  const listenVisible = React.useCallback(() => {
    if (show) {
      showSidebar();
    } else {
      hideSidebar();
    }
  }, [hideSidebar, show, showSidebar]);

  React.useEffect(() => {
    listenVisible();
  }, [listenVisible]);

  return (
    <React.Fragment>
      <div className={dropClass} onClick={handleDrop}></div>
      <div className={sidebarClass}>
        <ProfileSidebar />
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onVisible: PropTypes.func,
  onDropClick: PropTypes.func
};

Sidebar.defaultProps = {
  show: false,
  onHide: () => {},
  onVisible: () => {},
  onDropClick: () => {}
};

export default Sidebar;
