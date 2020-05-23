import { React, PropTypes, cx } from 'libraries';

const ChatBubble = ({ content, align, date }) => {
  const wrapperClass = cx('ChatBubble', {
    [`ChatBubble--${align}`]: align
  });

  return (
    <div className={wrapperClass}>
      <div className="ChatBubble__content">
        <div className="ChatBubble__message">{content}</div>
        <div className="ChatBubble__meta">{date}</div>
      </div>
    </div>
  );
};

ChatBubble.propTypes = {
  content: PropTypes.string,
  align: PropTypes.oneOf(['left', 'right']),
  date: PropTypes.string
};

ChatBubble.defaultProps = {
  content: '',
  align: 'left',
  date: null
};

export default ChatBubble;
