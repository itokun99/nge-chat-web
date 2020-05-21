import { React, MdChat, useHistory } from 'libraries';
import { BaseContainer, PrivateContainer } from 'containers';
import { Button, ChatListSection } from 'components';

const Dashboard = () => {
  const history = useHistory();
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

export default Dashboard;
