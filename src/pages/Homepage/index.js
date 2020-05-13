import { React, Link, useHistory } from 'libraries';
import { BaseContainer } from 'containers';
import { Button } from 'components';

const Homepage = () => {
  const history = useHistory();

  return (
    <BaseContainer disableHeader>
      <div className="Homepage">
        <div className="Homepage__content">
          <h1 className="Homepage__title">Nge-Chat</h1>
          <Button onClick={() => history.push('/login')} block>
            Login
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Homepage;
