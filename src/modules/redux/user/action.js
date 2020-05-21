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

export const setUserFilter = value => ({
  type: actionType.SET_USER_FILTER,
  value
});
