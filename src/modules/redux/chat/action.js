import actionType from './actionType';

/**
 * an Action for set selected user chat
 * @param {*} value
 */
export const setSelectedUserChat = value => ({
  type: actionType.SET_SELECTED_USER_CHAT,
  value
});

/**
 * an Action for set selected user chat
 * @param {*} value
 */
export const clearSelectedUserChat = () => ({
  type: actionType.CLEAR_SELECTED_USER_CHAT
});

/**
 * an Action for set chat content
 * @param {*} value
 */
export const setChatContent = value => ({
  type: actionType.SET_CHAT_CONTENT,
  value
});

/**
 * an Action for clear chat content
 * @param {*} value
 */
export const clearChatContent = () => ({
  type: actionType.CLEAR_CHAT_CONTENT
});

/**
 * an Action for set chat data
 * @param {*} value
 */
export const setChats = value => ({
  type: actionType.SET_CHATS,
  value
});

/**
 * an Action for set clear chat data
 * @param {*} value
 */
export const clearChats = () => ({
  type: actionType.CLEAR_CHATS
});
