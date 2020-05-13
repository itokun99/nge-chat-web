import { React, Link, useHistory, useState, firebase } from 'libraries';
import { BaseContainer } from 'containers';
import { Input, FormGroup, Button } from 'components';
import { firebaseService } from 'modules';

const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [email, changeEmail] = useState('', { name: 'email' });
  const [password, changePassword] = useState('');

  const submit = async () => {
    setLoading(true);
    try {
      await firebaseService.login({ email, password });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <BaseContainer
      disableRightAction
      onPressLeft={() => history.goBack()}
      headerProps={{
        theme: 'light',
        transparent: true
      }}
    >
      <div className="Login">
        <div className="Login__content">
          <h1 className="Login__title">Login</h1>
          <FormGroup>
            <Input
              value={email}
              onChange={e => changeEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />
          </FormGroup>
          <FormGroup>
            <Input
              value={password}
              onChange={e => changePassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </FormGroup>
          <Button disabled={loading} onClick={submit}>
            Submit
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Login;
