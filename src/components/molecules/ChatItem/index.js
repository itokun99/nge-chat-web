/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { React, PropTypes } from 'libraries';
import { Image } from 'components/atoms';
import { getInitialName } from 'utils';

const ChatItem = ({ title, description, image, onClick }) => (
  <div className="ChatItem" onClick={onClick}>
    <Image
      backgroundImage
      source={image}
      className="ChatItem__photo"
      resizeMode="cover"
    >
      {!image && (
        <span className="ChatItem__image-title">{getInitialName(title)}</span>
      )}
    </Image>
    <div className="ChatItem__textWrapper">
      <span className="ChatItem__title">{title}</span>
      <span className="ChatItem__description">{description}</span>
    </div>
  </div>
);

ChatItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  onClick: PropTypes.func
};

ChatItem.defaultProps = {
  title: '',
  description: '',
  image: '',
  onClick: () => {}
};

export default ChatItem;
