import {
  React,
  PropTypes,
  useHistory,
  MdAccountCircle,
  MdChatBubble,
  MdHelp,
  MdError,
  Link
} from 'libraries';
import { BaseContainer, PrivateContainer } from 'containers';

const settings = [
  {
    name: 'Akun',
    caption: 'Pengaturan Akun, Ubah nama, Ubah Email',
    icon: MdAccountCircle,
    path: '/setting/account'
  },
  {
    name: 'Chat',
    caption: 'Ubah Tema, Wallpaper, dan Warna Chat',
    icon: MdChatBubble,
    path: '/setting/chat'
  },
  {
    name: 'Bantuan',
    caption: 'Perlu bantuan atau ada pertanyaan?',
    icon: MdHelp,
    path: '/faq'
  },
  {
    name: 'Tentang Nge-Chat',
    caption: 'Informasi tentang aplikasi Nge-Chat dan Kami',
    icon: MdError,
    path: '/about'
  }
];

const Setting = () => {
  const history = useHistory();

  return (
    <PrivateContainer>
      <BaseContainer
        title="Pengaturan"
        headerProps={{
          theme: 'light',
          disableRightAction: true,
          disableShadow: true,
          onPressLeft: () => history.goBack()
        }}
      >
        <div className="Setting">
          {settings.map((setting, index) => (
            <Link
              key={index}
              to={setting.path}
              className="Setting__item"
              title={setting.caption}
            >
              <span className="Setting__icon">
                <setting.icon size={32} />
              </span>
              <span className="Setting__itemText">
                <span className="Setting__itemTitle">{setting.name}</span>
                <span className="Setting__itemDescription">
                  {setting.caption}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </BaseContainer>
    </PrivateContainer>
  );
};

export default Setting;
