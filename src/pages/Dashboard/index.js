import {
  React,
  MdChat,
  useHistory,
  useState,
  connect,
  PropTypes
} from 'libraries';
import { BaseContainer, PrivateContainer } from 'containers';
import { Button, Skeleton, ChatItem } from 'components';
import { getChatList } from 'services';
import { chatsSelector } from 'modules';

const Dashboard = ({ chats }) => {
  const [loading, changeLoading] = useState(true);
  const history = useHistory();

  const initData = React.useCallback(async () => {
    try {
      changeLoading(true);
      await getChatList();
      changeLoading(false);
    } catch (e) {
      changeLoading(false);
      initData();
    }
  }, []);

  React.useEffect(() => {
    initData();
  }, [initData]);

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
        {chats.map((user, index) => (
          <ChatItem
            key={index}
            onClick={() => history.push(`/chat/${user.userId}`)}
            title={user.name}
            description={user.lastChat.message}
            image={user.photo}
          />
        ))}
      </React.Fragment>
    );
  };

  return (
    <PrivateContainer>
      <BaseContainer
        sidebar
        disableRightAction
        headerProps={{
          title: 'Dashboard',
          theme: 'light',
          transparent: true
        }}
      >
        <div className="Dashboard">
          {renderList()}
          <Button
            onClick={() => history.push('/search')}
            circle
            circleSize={64}
            className="Dashboard__newChat"
          >
            <MdChat size={32} />
          </Button>
        </div>
      </BaseContainer>
    </PrivateContainer>
  );
};

const reduxState = state => ({
  chats: chatsSelector(state)
});

Dashboard.propTypes = {
  chats: PropTypes.array
};

Dashboard.defaultProps = {
  chats: []
};

export default connect(reduxState)(Dashboard);
