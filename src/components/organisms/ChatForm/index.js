import { React, PropTypes, MdSend } from 'libraries';
import { Input, Button } from 'components/atoms';

const ChatForm = () => (
  <div className="ChatForm">
    <div className="ChatForm__top"></div>
    <div className="ChatForm__bottom">
      <div className="ChatForm__inputWrapper">
        <Input
          placeholder="Ketik disini..."
          type="textarea"
          className="ChatForm__inputText"
        />
        <Button withIcon circle className="ChatForm__buttonSend">
          <MdSend size={24} />
        </Button>
      </div>
    </div>
  </div>
);

export default ChatForm;
