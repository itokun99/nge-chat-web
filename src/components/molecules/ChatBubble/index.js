import { React, PropTypes, cx } from 'libraries';

const ChatBubble = ({ content, align }) => {
  const wrapperClass = cx('ChatBubble', {
    [`ChatBubble--${align}`]: align
  });

  return (
    <div className={wrapperClass}>
      <div className="ChatBubble__content">{content}</div>
    </div>
  );
};

ChatBubble.propTypes = {
  content: PropTypes.string,
  align: PropTypes.oneOf(['left', 'right'])
};

ChatBubble.defaultProps = {
  content: '',
  align: 'left'
};

export default ChatBubble;
