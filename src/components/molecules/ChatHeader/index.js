/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { React, PropTypes } from 'libraries';
import { Image } from 'components/atoms';

const ChatHeader = ({ image, title, subtitle, onClick }) => (
  <div onClick={onClick} className="ChatHeader">
    <Image
      source={image}
      backgroundImage
      resizeMode="cover"
      className="ChatHeader__image"
    />
    <div className="ChatHeader__content">
      <span className="ChatHeader__title">{title}</span>
      <span className="ChatHeader__subtitle">{subtitle}</span>
    </div>
  </div>
);

ChatHeader.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onClick: PropTypes.func
};

ChatHeader.defaultProps = {
  image: '',
  title: '',
  subtitle: '',
  onClick: () => {}
};

export default ChatHeader;
