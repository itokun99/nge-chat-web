/**
 * a Selector for selectedChat
 * @param {*} state
 */
export const selectedUserChatSelector = state => state.chat.selectedUserChat;

/**
 * a Selector for chat contents
 * @param {*} state
 */
export const chatContentSelector = state => state.chat.chatContent;

/**
 * a Selector for chats data
 * @param {*} state
 */
export const chatsSelector = state => state.chat.chats;
