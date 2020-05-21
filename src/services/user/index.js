import { firebaseService, setUsers, store } from 'modules';
import { handleAsync } from 'utils';

const { dispatch } = store;

/**
 * a Service for get users from database
 */
export const getUsers = async () => {
  const [users, err] = await handleAsync(firebaseService.getUsers());
  if (err) {
    throw err;
  }

  dispatch(setUsers(users));
  return users;
};
