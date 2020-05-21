import { firebase } from 'libraries';
import { appConfig } from 'configs';
import { handleAsync } from 'utils';

// initializeApp
firebase.initializeApp(appConfig.firebase);
// const messaging = firebase.messaging();
// messaging.usePublicVapidKey(appConfig.fcm.key);

// console.log('messaging', messaging);

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

const authUser = () => {
  const promise = new Promise((resolve, reject) =>
    firebase.auth().onAuthStateChanged(
      user => {
        resolve(user);
      },
      error => {
        reject(error);
      }
    )
  );

  return promise;
};

const register = async (payload = {}) => {
  const [res, err] = await handleAsync(
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
  );
  if (err) throw err;
  return res;
};

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

const logout = async () => {
  const [res, err] = await handleAsync(firebase.auth().signOut());
  if (err) throw err;
  return res;
};

const loginWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  const response = await firebase.auth().signInWithRedirect(provider);

  return response;
};

export const firebaseService = {
  register,
  login,
  logout,
  loginWithGoogle,
  getUserData,
  createUserData,
  authUser
};
