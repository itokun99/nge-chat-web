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
