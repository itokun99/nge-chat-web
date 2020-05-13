import { firebase } from 'libraries';
import { appConfig } from 'configs';

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

  login = async (payload = {}) => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password);
      console.log('response', response);
      alert('Sukses');
      return response;
    } catch (err) {
      alert(err.message);
      throw err;
    }
  };

  logout = async () => {
    try {
      const response = await firebase.auth().signOut();
      alert('logout');
      return response;
    } catch (err) {
      alert(err.message);
    }
  };

  loginWithCredential = async (payload = {}) => {
    try {
      const response = await firebase.auth.EmailAuthProvider.credential(
        payload.email,
        payload.password
      );
      alert('success');
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  getCurrentUser = () => {
    const user = firebase.auth().currentUser;
    return user;
  };
}

export const firebaseService = new Firebase();
