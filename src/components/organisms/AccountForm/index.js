import { React, PropTypes, connect, useState } from 'libraries';
import { profileSelector } from 'modules';
import { showPopup, logout } from 'services';
import { FormGroup, Input, Label, Button } from 'components/atoms';
import { ImageInput } from 'components/molecules';

const AccountForm = ({ profile }) => {
  const [photo, changePhoto] = useState(null);
  const [name, changeName] = useState('');
  const [email, changeEmail] = useState('');

  const initData = React.useCallback(() => {
    if (profile) {
      changePhoto(profile.photo);
      changeName(profile.name);
      changeEmail(profile.email);
    }
  }, [profile]);

  const handleLogout = () => {
    showPopup({
      title: 'Yah, mau keluar? :(',
      description: 'Kalau begitu jangan lupa kasih feedback aplikasinya ya :D',
      showSecondButton: true,
      onClickButton: logout
    });
  };

  React.useEffect(() => {
    initData();
  }, [initData]);

  return (
    <div className="AccountForm">
      <FormGroup>
        <ImageInput image={photo} />
      </FormGroup>
      <FormGroup>
        <Label>Nama</Label>
        <Input
          onChange={e => changeName(e.target.value)}
          type="text"
          value={name}
          placeholder="Nama"
        />
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input
          onChange={e => changeEmail(e.target.value)}
          type="text"
          value={email}
          placeholder="Email"
        />
      </FormGroup>
      <FormGroup>
        <Button block>Simpan</Button>
      </FormGroup>
      <FormGroup>
        <Button block>Laporkan Masalah</Button>
      </FormGroup>
      <FormGroup>
        <Button onClick={handleLogout} block color="danger">
          Keluar
        </Button>
      </FormGroup>
    </div>
  );
};

AccountForm.propTypes = {
  profile: PropTypes.object
};

AccountForm.defaultProps = {
  profile: null
};

const reduxState = state => ({
  profile: profileSelector(state)
});

export default connect(reduxState)(AccountForm);
