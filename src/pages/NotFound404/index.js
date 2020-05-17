import { React, Link } from 'libraries';
import { Button } from 'components';
import { BaseContainer } from 'containers';

const NotFound404 = () => (
  <BaseContainer disableHeader transparent>
    <div className="NotFound404">
      <div className="NotFound404__content">
        <h1 className="NotFound404__title">404</h1>
        <div className="NotFound404__description">
          Nyari apaan brader? disini kagak ada yang kamu cari. Yuk balik lagi ke
          dashboard
        </div>
        <Link to="/">Balik Lagi Yuk</Link>
      </div>
    </div>
  </BaseContainer>
);

export default NotFound404;
