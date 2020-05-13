import { React, Link, useHistory, useState, firebase } from 'libraries';
import { BaseContainer } from 'containers';
import { Input, FormGroup, Button } from 'components';
import { firebaseService } from 'modules';
import { showPopup } from 'services';

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
      showPopup({
        title: 'Berhasil Masuk',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis lorem bibendum, pulvinar est in, blandit sem. Pellentesque vitae mi eu quam tempor luctus in a purus. Duis quis sollicitudin tortor.'
      });
    } catch (err) {
      showPopup({
        title: 'Terjadi Kesalahan!',
        description: err.message
      });
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
          <Button block disabled={loading} onClick={submit}>
            Masuk
          </Button>
          <div className="Login__divider"></div>

          <Button color="danger" block disabled={loading} onClick={submit}>
            Masuk dengan Google
          </Button>
        </div>
        <div className="Login__bottom">
          <span>
            Belum punya akun? daftar <Link to="/register">disini</Link>
          </span>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Login;
