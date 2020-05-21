import {
  thunk,
  createStore,
  combineReducers,
  applyMiddleware,
  composeWithDevTools
} from 'libraries';
import user from './user/reducer';
import post from './post/reducer';
import popup from './popup/reducer';
import profile from './profile/reducer';

/**
 * reducer
 */
export const reducer = combineReducers({
  user,
  post,
  popup,
  profile
});

/**
 * store
 */
export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

/**
 * dispatcher
 */
export * from './user/action';
export * from './post/action';
export * from './popup/action';
export * from './profile/action';

/**
 * selector
 */
export * from './user/selector';
export * from './post/selector';
export * from './popup/selector';
export * from './profile/selector';
