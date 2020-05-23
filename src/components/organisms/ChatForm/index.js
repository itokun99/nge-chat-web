import { React, PropTypes, MdSend, connect, useState, moment } from 'libraries';
import { Input, Button } from 'components/atoms';
import { ChatBubble } from 'components/molecules';
import {
  selectedUserChatSelector,
  profileSelector,
  chatContentSelector
} from 'modules';
import { sendChat } from 'services';

const ChatForm = ({ profile, receiver, chatContent }) => {
  const [message, changeMessage] = useState('');

  const chatScroller = React.useRef(null);

  const sendMessage = () => {
    if (!message) return null;
    const payload = {
      message,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    sendChat(payload, receiver.userId);
    changeMessage('');
  };

  const renderList = () => (
    <React.Fragment>
      {chatContent.map((chat, index) => (
        <ChatBubble
          date={chat.createdAt ? moment(chat.createdAt).format('HH:mm') : null}
          key={index}
          content={chat.message}
          align={profile.userId === chat.sender ? 'right' : 'left'}
        />
      ))}
    </React.Fragment>
  );

  console.log(chatScroller);

  return (
    <div className="ChatForm">
      <div ref={chatScroller} className="ChatForm__top">
        {renderList()}
      </div>
      <div className="ChatForm__bottom">
        <form className="ChatForm__inputWrapper">
          <Input
            value={message}
            onChange={e => changeMessage(e.target.value)}
            placeholder="Ketik disini..."
            type="textarea"
            className="ChatForm__inputText"
            rows={2}
          />
          <Button
            onClick={sendMessage}
            withIcon
            circle
            className="ChatForm__buttonSend"
          >
            <MdSend size={24} />
          </Button>
        </form>
      </div>
    </div>
  );
};

ChatForm.propTypes = {
  chatContent: PropTypes.array,
  profile: PropTypes.object,
  receiver: PropTypes.object
};

ChatForm.defaultProps = {
  chatContent: [],
  profile: null,
  receiver: null
};

const reduxState = state => ({
  chatContent: chatContentSelector(state),
  profile: profileSelector(state),
  receiver: selectedUserChatSelector(state)
});

export default connect(reduxState)(ChatForm);
