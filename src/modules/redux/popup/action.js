import actionType from './actionType';

/**
 * an Action for set popup reducer
 * @param {*} value
 */
export const setPopup = value => ({
  type: actionType.SET_POPUP,
  value
});

/**
 * an Action for clear popup reducer
 * @param {*} value
 */
export const clearPopup = () => ({
  type: actionType.CLEAR_POPUP
});
