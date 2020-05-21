import actionType from './actionType';

/**
 * an Action for set profile value profile reducer
 * @param {*} value a value require profile object
 */
export const setProfile = value => ({
  type: actionType.SET_PROFILE,
  value
});

/**
 * an Action for clear profile value to initialState in profile reducer
 */
export const clearProfile = () => ({
  type: actionType.CLEAR_PROFILE
});
