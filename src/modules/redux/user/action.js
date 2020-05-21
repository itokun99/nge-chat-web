import actionType from './actionType';

/**
 * an Action for set users data
 * @param {*} value a value require array object of user data
 */
export const setUsers = value => ({
  type: actionType.SET_USERS,
  value
});

/**
 * an Action for clear users data
 */
export const clearUsers = () => ({
  type: actionType.CLEAR_USERS
});

/**
 * an Action for set user filter text
 * @param {*} value a value require text string
 */
export const setUserFilter = value => ({
  type: actionType.SET_USER_FILTER,
  value
});

/**
 * an Action for set user contact data
 * @param {*} value
 */
export const setUserContact = value => ({
  type: actionType.SET_USER_CONTACT,
  value
});

/**
 * an Action for clear user contact data
 */
export const clearUserContact = () => ({
  type: actionType.CLEAR_USER_CONTACT
});
