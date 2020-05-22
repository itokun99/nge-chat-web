import {
  React,
  MdChat,
  useHistory,
  useParams,
  MdPersonAdd,
  connect,
  PropTypes
} from 'libraries';
import { userContactSelector } from 'modules';
import { BaseContainer, PrivateContainer } from 'containers';
import {
  Button,
  Image,
  FormGroup,
  FormText,
  ChatItem,
  Container,
  Skeleton
} from 'components';
import { getUser, getContacts, showPopup } from 'services';
import { createMessageFirebase } from 'utils';

const Contact = ({ users }) => {
  const [loading, setLoading] = React.useState(true);
  const history = useHistory();

  const navigateToDetail = userId => {
    history.push(`/user/${userId}`);
  };

  const initData = React.useCallback(async () => {
    try {
      setLoading(true);
      await getContacts();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      showPopup({
        title: 'Terjadi Kesalahan!',
        description: err.code
          ? createMessageFirebase(err.code)
          : createMessageFirebase(),
        onClickButton: initData
      });
      throw err;
    }
  }, []);

  const renderList = () => {
    if (loading) {
      return [1, 2, 3].map(val => (
        <div
          key={val}
          style={{
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: 24
          }}
        >
          <Skeleton radius={8} width={50} circle style={{ marginRight: 16 }} />
          <div>
            <Skeleton
              radius={8}
              width={200}
              height={18}
              style={{ marginBottom: 8 }}
            />
            <Skeleton radius={8} width={100} height={12} />
          </div>
        </div>
      ));
    }
    return (
      <React.Fragment>
        {users.map((user, index) => (
          <ChatItem
            key={index}
            onClick={() => navigateToDetail(user.userId)}
            title={user.name}
            description={user.email}
            image={user.photo}
          />
        ))}
      </React.Fragment>
    );
  };

  React.useEffect(() => {
    initData();
  }, [initData]);

  return (
    <PrivateContainer>
      <BaseContainer
        disableRightAction
        headerProps={{
          title: 'Kontak Saya',
          theme: 'light',
          disableShadow: true,
          onPressLeft: () => history.goBack()
        }}
      >
        <Container noPadding>{renderList()}</Container>
      </BaseContainer>
    </PrivateContainer>
  );
};
const reduxState = state => ({
  users: userContactSelector(state)
});

Contact.propTypes = {
  users: PropTypes.array
};

Contact.defaultProps = {
  users: []
};
export default connect(reduxState)(Contact);
