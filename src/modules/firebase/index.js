import { firebase } from 'libraries';
import { appConfig } from 'configs';
import { handleAsync } from 'utils';

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      this.init();
    }

    this.auth = firebase.auth;
    this.db = firebase.database();
  }

  init = () => {
    firebase.initializeApp(appConfig.firebase);
  };

  register = async (payload = {}) => {
    const [res, err] = await handleAsync(
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
    );

    if (err) throw err;

    const [res1, err1] = await handleAsync(
      this.createUserData({
        userId: res.user.uid,
        name: payload.name,
        email: payload.email
      })
    );

    if (err1) {
      throw err1;
    }

    return res;
  };

  loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  login = async (payload = {}) => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password);
      return response;
    } catch (err) {
      throw err;
    }
  };

  logout = async () => {
    try {
      const response = await firebase.auth().signOut();
      return response;
    } catch (err) {
      throw err;
    }
  };

  loginWithCredential = async (payload = {}) => {
    try {
      const response = await firebase.auth.EmailAuthProvider.credential(
        payload.email,
        payload.password
      );
      return response;
    } catch (err) {
      throw err;
    }
  };

  getCurrentUser = () => {
    const user = firebase.auth().currentUser;
    return user;
  };

  createUserData = async (payload = {}) => {
    const [res, err] = await handleAsync(
      firebase
        .database()
        .ref(`users/${payload.userId}`)
        .set({
          userId: payload.userId,
          name: payload.name,
          email: payload.email,
          photo: payload.photo || null
        })
    );

    if (err) throw err;
    return payload;
  };

  getUserData = () => {
    const userId = firebase.auth().currentUser.uid;
    const promise = new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`users/${userId}`)
        .on('value', snapshot => {
          resolve(snapshot.val());
        });
    });
    return promise;
  };
}

export const firebaseService = new Firebase();
