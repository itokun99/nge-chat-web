import { firebaseService, store, setProfile, clearProfile } from 'modules';
import { handleAsync } from 'utils';

const { dispatch } = store;

export const getProfile = () => {
  const promise = new Promise((resolve, reject) => {
    firebaseService.auth().onAuthStateChanged(
      async user => {
        console.log('getProfile', user);
        if (user) {
          let userData = await firebaseService.getUserData();

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
        reject(new Error('Error on auth with firebase'));
      }
    );
  });

  return promise;
};

export const logout = async () => {
  const [res, err] = await handleAsync(firebaseService.logout());
  if (err) throw err;
  dispatch(clearProfile());
  return res;
};
