/* eslint-disable no-throw-literal */
import { firebase } from 'libraries';
import {
  firebaseService,
  setUsers,
  store,
  clearUsers,
  setUserContact
} from 'modules';
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

/**
 * a Service for get one user data
 */
export const getUser = async userId => {
  const [res, err] = await handleAsync(
    firebaseService.getUserWithUserId(userId)
  );

  if (err) throw err;

  return res;
};

/**
 * a Service for get user contact
 */
export const getContacts = async () => {
  const [res, err] = await handleAsync(firebaseService.getUserContact());
  if (err) {
    throw err;
  }

  if (res) {
    // TODO: need better method for saving contact
    let userContact = [];
    const contactData = JSON.parse(res);
    console.log('contactData', contactData);

    if (contactData && contactData.length > 0) {
      userContact = contactData.map(userId =>
        firebaseService
          .getUserWithUserId(userId)
          .then(user => user)
          .catch(err => null)
      );

      userContact = await Promise.all(userContact);

      dispatch(setUserContact(userContact));
    }
  }

  return res;
};

/**
 * a Service for add contact
 */
export const addContact = async (payload = {}) => {
  try {
    if (!payload.userId) {
      throw new Error('userid/required');
    }

    let myContact = await firebaseService.getUserContact();
    if (myContact === null) {
      await firebaseService.addUserContact({ data: `[]` });
      myContact = `[]`;
    }

    myContact = JSON.parse(myContact);

    // check contact is already exists
    let isExist = false;
    myContact.forEach(val => {
      if (payload.userId === val) {
        isExist = true;
      }
    });

    if (isExist) {
      throw { message: 'User ini sudah ada dalam daftar kontak kamu!' };
    }

    const arrayData = [...myContact];
    arrayData.push(payload.userId);

    const reqPayload = {
      data: JSON.stringify(arrayData)
    };

    return await firebaseService.addUserContact(reqPayload);
  } catch (err) {
    throw err;
  }
};
