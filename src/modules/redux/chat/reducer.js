import actionType from './actionType';

const initialState = {
  selectedUserChat: null,
  chatContent: [],
  chats: []
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_CHAT_CONTENT:
      return {
        ...state,
        chatContent: action.value
      };

    case actionType.CLEAR_CHAT_CONTENT:
      return {
        ...state,
        chatContent: initialState.chatContent
      };
    case actionType.SET_SELECTED_USER_CHAT:
      return {
        ...state,
        selectedUserChat: action.value
      };
    case actionType.CLEAR_SELECTED_USER_CHAT:
      return {
        ...state,
        selectedUserChat: initialState.selectedUserChat
      };
    case actionType.SET_CHATS:
      return {
        ...state,
        chats: action.value
      };
    case actionType.CLEAR_CHATS:
      return {
        ...state,
        chats: initialState.chats
      };
    default:
      return state;
  }
};

export default chat;
