import { React, useHistory } from 'libraries';
import { BaseContainer } from 'containers';

const About = () => {
  const history = useHistory();

  return (
    <BaseContainer title="About" onPressLeft={() => history.goBack()}>
      <div>
        <h1>About ME</h1>
        <p>Cuma orang biasa</p>
      </div>
    </BaseContainer>
  );
};

export default About;
