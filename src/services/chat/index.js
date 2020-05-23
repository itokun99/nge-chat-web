import { firebase } from 'libraries';
import {
  firebaseService,
  setChats,
  store,
  chatsSelector,
  setChatContent,
  clearChatContent
} from 'modules';

const { dispatch } = store;

export const getUserChatContent = async receiverUserId => {
  try {
    const userChat = await firebaseService.getUserChatData(receiverUserId);
    if (!userChat) {
      dispatch(clearChatContent());
      return null;
    }
    const { chatKey } = userChat;
    return firebase
      .database()
      .ref(`/chats/${chatKey}`)
      .on('value', snapshot => {
        const chatObj = snapshot.val();
        if (chatObj) {
          const chatList = Object.keys(chatObj).map(key => chatObj[key]);
          dispatch(setChatContent(chatList));
        } else {
          dispatch(clearChatContent());
        }
      });
  } catch (err) {
    console.log('err', err);
    throw err;
  }
};

export const sendChat = async (payload = {}, receiverUserId) => {
  try {
    const existChat = await firebaseService.getUserChatData(receiverUserId);
    if (!existChat) {
      await firebaseService.addNewChat(payload, receiverUserId);
      return getUserChatContent(receiverUserId);
    }
    const { chatKey } = existChat;
    await firebaseService.updateChat(payload, chatKey);
    return getUserChatContent(receiverUserId);
  } catch (err) {
    throw err;
  }
};

/**
 * a Service for get all chat list with current user
 */
export const getChatList = () =>
  new Promise((resolve, reject) => {
    const { currentUser } = firebase.auth();

    firebase
      .database()
      .ref(`/userChat/${currentUser.uid}`)
      .on(
        'value',
        snapshot => {
          const data = snapshot.val();
          if (data) {
            const chatArr = Object.keys(data).map(async key => {
              const user = await firebaseService.getUserWithUserId(key);
              let chatContent = await firebaseService.getChatContent(
                data[key].chatKey
              );

              if (chatContent) {
                chatContent = Object.keys(chatContent).map(p => chatContent[p]);
              }
              return {
                ...user,
                ...data[key],
                ...(chatContent && {
                  lastChat: chatContent[chatContent.length - 1]
                })
              };
            });
            Promise.all(chatArr).then(result => {
              dispatch(setChats(result));
              resolve(result);
            });
          }
          resolve(true);
        },
        error => {
          reject(error);
          console.log('error', error);
        }
      );
  });
