import { reselect } from 'libraries';
import { profileSelector } from '../profile/selector';

/**
 * a Selector for users data
 * @param {*} state
 */
export const usersSelector = state => {
  const profileState = state.profile;

  if (!profileState) return state.user.all;

  return state.user.all.filter(user => user.userId !== profileState.userId);
};

/**
 * a Selector for filter text user
 * @param {*} state
 */
export const userFilterTextSelector = state => state.user.filterText;

/**
 * a Selector for filtered users
 */
export const usersSearchSelector = reselect.createSelector(
  usersSelector,
  userFilterTextSelector,
  (users, filterText) => {
    if (!filterText) {
      return users;
    }

    return (
      users.filter(
        user => user.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
      ) ||
      users.filter(
        user =>
          user.email.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
      )
    );
  }
);

/**
 * a Selector for user contacts
 * @param {*} state
 */
export const userContactSelector = state => state.user.contacts;
