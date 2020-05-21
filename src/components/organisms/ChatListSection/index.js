import { React, PropTypes } from 'libraries';
import { Image } from 'components/atoms';
import { ChatItem } from 'components/molecules';

const ChatListSection = () => (
  <div className="ChatListSection">
    {[1, 2, 3, 4, 5].map(val => (
      <ChatItem key={val} />
    ))}
  </div>
);

export default ChatListSection;
