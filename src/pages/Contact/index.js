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
  Container
} from 'components';
import { getUser, getContacts } from 'services';

const Contact = ({ users }) => {
  const history = useHistory();

  const navigateToDetail = userId => {
    history.push(`/user/${userId}`);
  };

  const renderList = () => (
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

  React.useEffect(() => {
    getContacts();
  }, []);

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
