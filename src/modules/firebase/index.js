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
 * TODO: refactor
 * @param {*} payload
 */
const updateUserProfile = async (payload = {}) => {
  const user = firebase.auth().currentUser;

  try {
    if (payload.name) {
      await user.updateProfile({ displayName: payload.name });
    }
    if (payload.photo) {
      await user.updateProfile({ photo: payload.photo });
    }

    // if (payload.email) {
    //   await user.updateEmail(payload.email);
    // }

    return user;
  } catch (err) {
    throw err;
  }
};

/**
 * a firebase service for update user data from firebase database
 * @param {*} payload
 */
const updateUserData = (payload = {}) => {
  const userId = firebase.auth().currentUser.uid;

  return new Promise((resolve, reject) => {
    const userRef = firebase.database().ref(`users/${userId}`);
    userRef.update(payload, err => {
      if (err) {
        return reject(err);
      }
      return resolve(true);
    });
  });
};

/**
 * a firebase service for get all users data
 */
const getUserWithUserId = async userId => {
  try {
    const usersSnapshot = await firebase
      .database()
      .ref(`/users/${userId}`)
      .once('value');
    const usersData = usersSnapshot.val();
    return usersData;
  } catch (err) {
    throw err;
  }
};

/**
 * a firebase service for upload image to firebase storage
 */
const uploadToStorage = async file => {
  const storageRef = firebase.storage().ref();
  try {
    const snapshot = await storageRef.put(file);
    return snapshot;
  } catch (err) {
    throw err;
  }
};

/**
 * a firebase service for add contact
 */
const addUserContact = (payload = {}) => {
  const userId = firebase.auth().currentUser.uid;

  return firebase
    .database()
    .ref(`/userContact/${userId}`)
    .set({
      data: payload.data
    });
};

const getUserContact = async () => {
  const userId = firebase.auth().currentUser.uid;

  try {
    const snapshot = await firebase
      .database()
      .ref(`/userContact/${userId}`)
      .once('value');

    const snapshotData = snapshot.val();

    if (!snapshotData) return snapshotData;

    const { data } = snapshotData;
    return data;
  } catch (err) {
    throw err;
  }
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
  createUserData,
  updateUserData,
  updateUserProfile,
  getUserWithUserId,
  uploadToStorage,
  addUserContact,
  getUserContact
};
