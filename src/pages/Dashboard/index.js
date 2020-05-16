import { React } from 'libraries';
import { BaseContainer, PrivateContainer } from 'containers';
import { Button } from 'components';
import { logout } from 'services';

const Dashboard = () => (
  <PrivateContainer>
    <BaseContainer
      disableRightAction
      headerProps={{
        theme: 'light',
        transparent: true
      }}
    >
      <div className="Dashboard">
        <div className="Dashboard__header">
          <h1 className="Dashboard__title">Selamat Datang!</h1>
          <div className="Dashboard__description">
            Ayo mulai nge-chat bareng orang-orang di sekitar mu
            <Button onClick={logout}>Logout</Button>
          </div>
        </div>

        <div className="Dashboard__body"></div>
      </div>
    </BaseContainer>
  </PrivateContainer>
);

export default Dashboard;
