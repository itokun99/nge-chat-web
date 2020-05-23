import {
  React,
  MdChat,
  useHistory,
  useParams,
  MdPersonAdd,
  connect,
  PropTypes
} from 'libraries';
import {
  chatContentSelector,
  userContactSelector,
  setSelectedUserChat,
  clearSelectedUserChat,
  clearChatContent
} from 'modules';
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
import { getUser, getContacts, showPopup, getUserChatContent } from 'services';
import { createMessageFirebase } from 'utils';

const Chat = ({ chatContent, setUserChat, clearState }) => {
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
          setUserChat(user);
          getUserChatContent(user.userId);
        }
      })
      .catch(err => console.log(err));
  }, [setUserChat, userId]);

  React.useEffect(() => {
    initData();

    return () => {
      clearState();
    };
  }, [clearState, initData]);

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

Chat.propTypes = {
  chatContent: PropTypes.array,
  setUserChat: PropTypes.func,
  clearState: PropTypes.func
};

Chat.defaultProps = {
  chatContent: [],
  setUserChat: () => {},
  clearState: () => {}
};

const reduxState = state => ({
  chatContent: chatContentSelector(state)
});

const reduxDispatch = dispatch => ({
  setUserChat: p => dispatch(setSelectedUserChat(p)),
  clearState: () => {
    dispatch(clearSelectedUserChat());
  }
});

export default connect(reduxState, reduxDispatch)(Chat);
