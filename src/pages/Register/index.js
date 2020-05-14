import {
  React,
  Link,
  useHistory,
  useState,
  firebase,
  PropTypes,
  connect
} from 'libraries';
import { BaseContainer } from 'containers';
import { Input, FormGroup, Button } from 'components';
import { firebaseService, profileSelector } from 'modules';
import { showPopup } from 'services';
import { validateEmail, handleAsync } from 'utils';

const Register = ({ profile }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [name, changeName] = useState('');
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const [password2, changePassword2] = useState('');

  const submit = async () => {
    if (!name || !email || !password || !password2) {
      return showPopup({
        title: 'Formulir tidak lengkap',
        description:
          'Formulir tidak diisi dengan benar! Pastikan untuk mengisi formulir registrasi dengan benar'
      });
    }

    if (!validateEmail(email)) {
      return showPopup({
        title: 'Email tidak valid',
        description: 'Pastikan format email untuk akun anda diisi dengan benar!'
      });
    }

    if (password !== password2) {
      return showPopup({
        title: 'Kata sandi tidak cocok!',
        description:
          'Pastikan kata sandi dan konfirmasi kata sandi harus sama! pastikan formulir diisi dengan lengkap'
      });
    }
    const payload = {
      email,
      password,
      name
    };

    setLoading(true);
    const [res, err] = await handleAsync(firebaseService.register(payload));
    setLoading(false);
    if (err) {
      showPopup({
        title: 'Terjadi Kesalahan!',
        description:
          err && err.message
            ? err.message
            : 'Terjadi kesalahan pada sistem saat melakukan registrasi. Mohon coba lagi pada beberapa saat!'
      });
      throw err;
    }

    showPopup({
      title: 'Registrasi Berhasil!',
      description:
        'Pendaftaran untuk akun nge-chat berhasil dilakukan. Silahkan nikmati fitur aplikasi nge-chat!'
    });

    return res;
  };

  const submitGoogle = async () => {
    setLoading(true);
    const [res, err] = await handleAsync(firebaseService.loginWithGoogle());
    setLoading(false);
    if (err) {
      showPopup({
        title: 'Terjadi Kesalahan!',
        description: err.message
      });
      throw err;
    }

    showPopup({
      title: 'Registrasi Berhasil!',
      description:
        'Pendaftaran untuk akun nge-chat berhasil dilakukan. Silahkan nikmati fitur aplikasi nge-chat!'
    });

    return res;
  };

  React.useEffect(() => {
    if (profile) {
      history.replace('/dashboard/');
    }
  }, [history, profile]);

  return (
    <BaseContainer
      disableRightAction
      onPressLeft={() => history.goBack()}
      headerProps={{
        theme: 'light',
        transparent: true
      }}
    >
      <div className="Register">
        <div className="Register__content">
          <h1 className="Register__title">Daftar Nge-Chat</h1>
          <div className="Register__description">
            Gabung dan jadi bagian dari komunitas nge-chat bersama orang
            terdekat
          </div>
          <FormGroup>
            <Input
              value={name}
              onChange={e => changeName(e.target.value)}
              type="text"
              placeholder="Nama lengkap"
            />
          </FormGroup>
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
          <FormGroup>
            <Input
              value={password2}
              onChange={e => changePassword2(e.target.value)}
              type="password"
              placeholder="Konfirmasi Kata Sandi"
            />
          </FormGroup>
          <Button block onClick={submit} disabled={loading}>
            Daftar
          </Button>
          <div className="Register__divider"></div>

          <Button
            color="danger"
            block
            disabled={loading}
            onClick={submitGoogle}
          >
            Daftar dengan Google
          </Button>
        </div>
        <div className="Register__bottom">
          <span>
            Sudah Punya akun? masuk <Link to="/login">disini</Link>
          </span>
        </div>
      </div>
    </BaseContainer>
  );
};

Register.propTypes = {
  profile: PropTypes.object
};

Register.defaultProps = {
  profile: null
};

const reduxState = state => ({
  profile: profileSelector(state)
});

export default connect(reduxState)(Register);
