import { firebase } from 'libraries';
import { firebaseService, store, setProfile, clearProfile } from 'modules';

const { dispatch } = store;

export const getProfile = () => {
  const promise = new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(
      async user => {
        if (user) {
          let userData = await firebaseService.getUserData(user.uid);

          if (!userData) {
            userData = await firebaseService.createUserData({
              name: user.displayName,
              email: user.email,
              userId: user.uid,
              photo: user.photoURL
            });
          }

          const userObj = { ...user, ...userData };

          dispatch(setProfile(userObj));
          resolve(user);
        } else {
          dispatch(clearProfile());
          resolve(null);
        }
      },
      error => {
        dispatch(clearProfile());
        reject(new Error('Error on auth with firebase'));
      }
    );
  });

  return promise;
};
