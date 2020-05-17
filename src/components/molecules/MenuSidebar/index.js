import {
  React,
  NavLink,
  MdChatBubble,
  MdError,
  MdContacts,
  MdSettings
} from 'libraries';

const menu = [
  {
    name: 'Nge-Chat',
    icon: MdChatBubble,
    path: '/dashboard'
  },
  {
    name: 'Kontak',
    icon: MdContacts,
    path: '/contact'
  },
  {
    name: 'Pengaturan',
    icon: MdSettings,
    path: '/setting'
  },
  {
    name: 'Tentang Nge-Chat',
    icon: MdError,
    path: '/about'
  }
];

const MenuSidebar = () => (
  <div className="MenuSidebar">
    {menu.map((item, index) => (
      <NavLink
        key={index}
        to={item.path}
        activeClassName="MenuSidebar__item--active"
        className="MenuSidebar__item"
      >
        <span className="MenuSidebar__icon">
          <item.icon size={24} />
        </span>
        <span className="MenuSidebar__text">{item.name}</span>
      </NavLink>
    ))}
  </div>
);

export default MenuSidebar;
