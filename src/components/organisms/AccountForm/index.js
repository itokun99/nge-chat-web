import { React, PropTypes, connect, useState } from 'libraries';
import { profileSelector } from 'modules';
import { showPopup, logout, updateProfile } from 'services';
import { FormGroup, Input, Label, Button } from 'components/atoms';
import { ImageInput } from 'components/molecules';
import { handleAsync, createMessageFirebase } from 'utils';

const AccountForm = ({ profile }) => {
  const [photo, changePhoto] = useState(null);
  const [photoFile, changePhotoFile] = useState(null);
  const [name, changeName] = useState('');
  const [email, changeEmail] = useState('');
  const [bio, changeBio] = useState('');

  const initData = React.useCallback(() => {
    if (profile) {
      changePhoto(profile.photo);
      changeName(profile.name);
      changeEmail(profile.email);
      changeBio(profile.bio);
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

  const handleChangePhoto = (file, imageBase64) => {
    changePhotoFile(file);
    changePhoto(imageBase64);
  };

  const handleSubmit = async () => {
    if (!name) {
      return showPopup({
        title: 'Terjadi Kesalahan!',
        description:
          'Form tidak boleh kosong, isi dengan benar atau tidak merubah sama sekali!',
        onClickButton: initData
      });
    }

    const payload = {
      name,
      bio
    };

    const [res, err] = await handleAsync(updateProfile(payload));

    if (err) {
      return showPopup({
        title: 'Terjadi kesalahan!',
        description: createMessageFirebase(err.code)
      });
    }

    showPopup({
      title: 'Berhasil!',
      description: 'Informasi profile kamu sudah berhasil di perbarui!'
    });

    return res;
  };

  React.useEffect(() => {
    initData();
  }, [initData]);

  return (
    <div className="AccountForm">
      <FormGroup>
        <ImageInput image={photo} onChange={handleChangePhoto} />
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
        <Label>Bio</Label>
        <Input
          onChange={e => changeBio(e.target.value)}
          type="textarea"
          value={bio}
          placeholder="Bio"
        />
      </FormGroup>
      <FormGroup>
        <Button block onClick={handleSubmit}>
          Simpan
        </Button>
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
