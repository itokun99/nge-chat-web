import { firebase } from 'libraries';
import { firebaseService, setUsers, store, clearUsers } from 'modules';
import { handleAsync } from 'utils';

const { dispatch } = store;

/**
 * a Service for get users from database
 */
export const getUsers = async () =>
  new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('/users')
      .on(
        'value',
        snapshot => {
          const usersData = snapshot.val();
          let users = [];

          if (usersData) {
            users = Object.keys(usersData).map(key => usersData[key]);
          }

          dispatch(setUsers(users));
          resolve(users);
        },
        error => {
          dispatch(clearUsers());
          reject(error);
        }
      );
  });
