import { firebase, moment } from 'libraries';
import { appConfig } from 'configs';
import { handleAsync } from 'utils';

// initializeApp
firebase.initializeApp(appConfig.firebase);

const getAuthUser = () => firebase.auth().currentUser;

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
 * a firebase service for add new chat data to database
 * @param {*} payload require { message, createdAt }
 * @param {*} receiverUserId require from selected user data
 */
const addNewChat = async (payload = {}, receiverUserId) => {
  try {
    // current user as sender
    const { currentUser } = firebase.auth();

    // push chat key for new chat creation
    const newChatKey = await firebase
      .database()
      .ref('/chats')
      .push().key;

    // set chat payload to chat with chat key
    await firebase
      .database()
      .ref(`/chats/${newChatKey}/${moment().unix()}`)
      .update({ ...payload, sender: currentUser.uid });

    // save chat record to sender and receiver
    await firebase
      .database()
      .ref(`/userChat/${currentUser.uid}/${receiverUserId}`)
      .set({
        chatKey: newChatKey
      });

    await firebase
      .database()
      .ref(`/userChat/${receiverUserId}/${currentUser.uid}`)
      .set({
        chatKey: newChatKey
      });

    return true;
  } catch (err) {
    throw err;
  }
};

/**
 * a firebase service for add new chat to existing chat object in database
 * @param {*} payload require { message, createdAt }
 * @param {*} chatKey from existing chatdata
 */
const updateChat = (payload = {}, chatKey) => {
  const { currentUser } = firebase.auth();
  const chatRef = firebase
    .database()
    .ref(`/chats/${chatKey}/${moment().unix()}`);
  return chatRef.set({ ...payload, sender: currentUser.uid });
};

const getUserChatData = async receiverUserId => {
  try {
    const { currentUser } = firebase.auth();
    const snapshot = await firebase
      .database()
      .ref(`/userChat/${currentUser.uid}/${receiverUserId}`)
      .once('value');
    return snapshot.val();
  } catch (err) {
    throw err;
  }
};

const getChatContent = async chatKey => {
  try {
    const chatRef = firebase.database().ref(`/chats/${chatKey}`);
    const snapshot = await chatRef.once('value');
    return snapshot.val();
  } catch (err) {
    throw err;
  }
};

/**
 * a firebase group all service
 */
export const firebaseService = {
  getAuthUser,
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
  getUserContact,
  addNewChat,
  updateChat,
  getUserChatData,
  getChatContent
};
