import { React, PropTypes } from 'libraries';
import { Image } from 'components/atoms';

const ChatItem = () => (
  <div className="ChatItem">
    <Image backgroundImage source="" className="ChatItem__photo" />
    <div className="ChatItem__textWrapper">
      <span className="ChatItem__title">New Message</span>
      <span className="ChatItem__description">
        Lorem ipsum dolor sit amet ...
      </span>
    </div>
  </div>
);

export default ChatItem;
