import { React, Link, useHistory, useState } from 'libraries';
import { BaseContainer, AuthContainer } from 'containers';
import { Input, FormGroup, Button } from 'components';
import { showPopup, login, loginGoogle } from 'services';
import { validateEmail, handleAsync } from 'utils';

const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [email, changeEmail] = useState('', { name: 'email' });
  const [password, changePassword] = useState('');

  const submit = async () => {
    if (!email || !password) {
      return showPopup({
        title: 'Formulir tidak lengkap',
        description:
          'Formulir tidak diisi dengan benar! Pastikan untuk mengisi formulir login dengan benar'
      });
    }

    if (!validateEmail(email)) {
      return showPopup({
        title: 'Email tidak valid',
        description: 'Pastikan format email untuk akun anda diisi dengan benar!'
      });
    }

    setLoading(true);
    try {
      await login({ email, password });
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

  const submitGoogle = async () => {
    setLoading(true);
    const [res, err] = await handleAsync(loginGoogle());
    setLoading(false);
    if (err) {
      showPopup({
        title: 'Terjadi Kesalahan!',
        description: err.message
      });
      throw err;
    }

    showPopup({
      title: 'Berhasil Masuk',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis lorem bibendum, pulvinar est in, blandit sem. Pellentesque vitae mi eu quam tempor luctus in a purus. Duis quis sollicitudin tortor.'
    });

    return res;
  };

  return (
    <AuthContainer>
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
            <h1 className="Login__title">Masuk</h1>
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
                placeholder="Kata Sandi"
              />
            </FormGroup>
            <Button block disabled={loading} onClick={submit}>
              Masuk
            </Button>
            <div className="Login__divider"></div>

            <Button
              color="danger"
              block
              disabled={loading}
              onClick={submitGoogle}
            >
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
    </AuthContainer>
  );
};

export default Login;
