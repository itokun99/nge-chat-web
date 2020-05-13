import { React, Link, useHistory } from 'libraries';
import { BaseContainer } from 'containers';
import { Button } from 'components';
import { showPopup } from 'services';

const Homepage = () => {
  const history = useHistory();

  const handleClick = () => {
    showPopup({
      show: true,
      title: 'Ini Judul',
      description: 'Ini description'
    });
  };

  return (
    <BaseContainer disableHeader>
      <div className="Homepage">
        <div className="Homepage__content">
          <h1 className="Homepage__title">Nge-Chat</h1>
          <div className="Homepage__description">
            Nge-Chat adalah aplikasi berbalas pesan yang simpel, dan open source
          </div>
          <Link to="/login">Coba Sekarang!</Link>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Homepage;
