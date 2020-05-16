import { React, Link } from 'libraries';
import { BaseContainer, AuthContainer } from 'containers';

const Homepage = () => (
  <AuthContainer>
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
  </AuthContainer>
);
export default Homepage;
