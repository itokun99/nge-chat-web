import { React, Link, useHistory, useState, firebase } from 'libraries';
import { BaseContainer } from 'containers';
import { Input, FormGroup, Button } from 'components';
import { firebaseService } from 'modules';
import { showPopup } from 'services';

const Register = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [name, changeName] = useState('');
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');

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
              placeholder="Password"
            />
          </FormGroup>
          <Button block disabled={loading}>
            Daftar
          </Button>
          <div className="Register__divider"></div>

          <Button color="danger" block disabled={loading}>
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

export default Register;
