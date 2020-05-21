import { reselect } from 'libraries';

/**
 * a Selector for users data
 * @param {*} state
 */
export const usersSelector = state => state.user.all;

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
