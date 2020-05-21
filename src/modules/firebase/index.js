import { firebase } from 'libraries';
import { appConfig } from 'configs';
import { handleAsync } from 'utils';

// initializeApp
firebase.initializeApp(appConfig.firebase);

/**
 * a firebase service for create user data,
 * user data store to firebase db for user information
 * @param {*} payload a payload require ['name', 'email', 'userId', 'photo']
 */
const createUserData = async (payload = {}) => {
  try {
    await firebase
      .database()
      .ref(`users/${payload.userId}`)
      .set({
        userId: payload.userId,
        name: payload.name,
        email: payload.email,
        photo: payload.photo || null
      });

    return payload;
  } catch (err) {
    throw err;
  }
};

/**
 * a firebase service for get user data information
 * from firebase database, user id get from current auth user
 */
const getUserData = () => {
  const userId = firebase.auth().currentUser.uid;
  const promise = new Promise(resolve => {
    firebase
      .database()
      .ref(`users/${userId}`)
      .on('value', snapshot => {
        resolve(snapshot.val());
      });
  });
  return promise;
};

/**
 * a firebase service for creating auth user with email and password
 * @param {*} payload a payload require ['email', 'password']
 */
const register = async (payload = {}) => {
  const [res, err] = await handleAsync(
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
  );
  if (err) throw err;
  return res;
};

/**
 * a firebase service for login user with email and password
 * @param {*} payload a payload require ['email', 'password']
 */
const login = async (payload = {}) => {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password);
    return response;
  } catch (err) {
    throw err;
  }
};

/**
 * a firebase service for logout from auth firebase
 */
const logout = async () => {
  const [res, err] = await handleAsync(firebase.auth().signOut());
  if (err) throw err;
  return res;
};

/**
 * a firebase service for login with google auth provider
 */
const loginWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  const response = await firebase.auth().signInWithRedirect(provider);

  return response;
};

/**
 * a firebase group all service
 */
export const firebaseService = {
  register,
  login,
  logout,
  loginWithGoogle,
  getUserData,
  createUserData
};
