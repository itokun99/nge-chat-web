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
  Skeleton,
  ChatHeader,
  ChatForm
} from 'components';
import { getUser, getContacts, showPopup } from 'services';
import { createMessageFirebase } from 'utils';

const Chat = () => {
  const [loading, setLoading] = React.useState(true);
  const [name, changeName] = React.useState('');
  const [photo, changePhoto] = React.useState('');
  const history = useHistory();
  const { userId } = useParams();

  const initData = React.useCallback(() => {
    getUser(userId)
      .then(user => {
        if (user) {
          changeName(user.name);
          changePhoto(user.photo);
        }
      })
      .catch(err => console.log(err));
  }, [userId]);

  React.useEffect(() => {
    initData();
  }, [initData]);

  return (
    <PrivateContainer>
      <BaseContainer
        disableRightAction
        headerProps={{
          theme: 'light',
          disableShadow: true,
          onPressLeft: () => history.goBack(),
          centerComponent: (
            <ChatHeader
              onClick={() => history.push(`/user/${userId}`)}
              image={photo}
              title={name}
              subtitle="online"
            />
          )
        }}
      >
        <Container noPadding>
          <ChatForm />
        </Container>
      </BaseContainer>
    </PrivateContainer>
  );
};
export default Chat;
