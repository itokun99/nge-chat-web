import { API } from 'configs';
import { handleAsync } from 'utils';
import { store, setProfile } from 'modules';

const { dispatch } = store;


export const login = async (payload = {}) => {
  const [res, err] = await handleAsync(API.login(payload));
  if(err) throw err;
  
  const { data } = res;
  
  dispatch(setProfile(data));
  return data;
}

export const register = async (payload = {}) => {
  const [res, err] = await handleAsync(API.register(payload));
  if(err) throw err;
  return res;
}