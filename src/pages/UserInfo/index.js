import { React, MdChat, useHistory, useParams, MdPersonAdd } from 'libraries';
import { BaseContainer, PrivateContainer } from 'containers';
import { Button, Image, FormGroup, FormText } from 'components';
import { getUser, addContact, showPopup } from 'services';
import { createMessageFirebase } from 'utils';

const UserInfo = () => {
  const history = useHistory();
  const { id } = useParams();
  const [name, changeName] = React.useState('');
  const [photo, changePhoto] = React.useState('');
  const [bio, changeBio] = React.useState('');
  const [email, changeEmail] = React.useState('');

  const initData = React.useCallback(() => {
    getUser(id)
      .then(user => {
        if (user) {
          changeName(user.name);
          changePhoto(user.photo);
          changeBio(user.bio);
          changeEmail(user.email);
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleAddContact = async () => {
    try {
      await addContact({ userId: id });

      showPopup({
        title: 'Berhasil!',
        description: `${name} berhasil ditambahkan ke daftar kontak kamu`
      });
    } catch (err) {
      showPopup({
        title: 'Terjadi Kesalahan!',
        description: err.code ? createMessageFirebase(err.code) : err.message
      });
      console.log(err);
    }
  };

  React.useEffect(() => {
    initData();
  }, [initData]);

  return (
    <PrivateContainer>
      <BaseContainer
        disableRightAction
        headerProps={{
          title: 'Informasi Pengguna',
          theme: 'light',
          disableShadow: true,
          onPressLeft: () => history.goBack()
        }}
      >
        <div className="UserInfo">
          <div className="UserInfo__form">
            <Image
              className="UserInfo__photo"
              source={photo}
              backgroundImage
              resizeMode="cover"
            ></Image>
            <FormGroup>
              <FormText label="Nama" text={name} />
            </FormGroup>
            <FormGroup>
              <FormText label="Email" text={email} />
            </FormGroup>
            <FormGroup>
              <FormText label="Bio" text={bio} />
            </FormGroup>
            <FormGroup>
              <Button withIcon block>
                <MdChat size={24} style={{ marginRight: 8 }} />
                Mulai Nge-Chat!
              </Button>
            </FormGroup>
            <FormGroup>
              <Button
                withIcon
                block
                color="secondary"
                onClick={handleAddContact}
              >
                <MdPersonAdd style={{ marginRight: 8 }} size={24} />
                Tambah Kontak
              </Button>
            </FormGroup>
          </div>
        </div>
      </BaseContainer>
    </PrivateContainer>
  );
};

export default UserInfo;
