import actionType from './actionType';

export const setProfile = value => ({
  type: actionType.SET_PROFILE,
  value
});

export const clearProfile = value => ({
  type: actionType.CLEAR_PROFILE,
  value
});
