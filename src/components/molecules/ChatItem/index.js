import { React, PropTypes } from 'libraries';
import { Image } from 'components/atoms';
import { getInitialName } from 'utils';

const ChatItem = ({ title, description, image }) => (
  <div className="ChatItem">
    <Image backgroundImage source={image} className="ChatItem__photo">
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
  image: PropTypes.string
};

ChatItem.defaultProps = {
  title: '',
  description: '',
  image: ''
};

export default ChatItem;
