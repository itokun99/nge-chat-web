import { handleAsync, createProfileObj } from 'utils';
import { store, firebaseService, clearProfile, setProfile } from 'modules';

const { dispatch } = store;

/**
 * a Service for register
 * @param {*} payload payload require { name, email, password }
 */
export const register = async (payload = {}) => {
  try {
    const res = await firebaseService.register(payload);
    const { user } = res;

    const userForm = {
      userId: user.uid,
      name: payload.name,
      email: payload.email
    };

    // profile creation in database
    await firebaseService.createUserData(userForm);

    return res;
  } catch (err) {
    throw err;
  }
};

/**
 * a Service for login
 * @param {*} payload payload require { email, password }
 */
export const login = async (payload = {}) => {
  const [res, err] = await handleAsync(firebaseService.login(payload));

  if (err) {
    throw err;
  }
  const { user } = res;
  const userData = await firebaseService.getUserData(user.uid);

  const userObj = createProfileObj({ ...user, ...userData });

  dispatch(setProfile(userObj));

  return res;
};

/**
 * a Service for login / register with google
 */
export const loginGoogle = async () => {
  const [res, err] = await handleAsync(firebaseService.loginWithGoogle());

  if (err) throw err;

  return res;
};

/**
 * a Service for logout
 */
export const logout = async () => {
  const [res, err] = await handleAsync(firebaseService.logout());
  if (err) throw err;
  dispatch(clearProfile());
  return res;
};
