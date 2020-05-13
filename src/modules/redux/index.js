import {
  combineReducers,
  createStore,
  thunk,
  applyMiddleware,
  composeWithDevTools
} from 'libraries';
import post from './post/reducer';
import popup from './popup/reducer';
import profile from './profile/reducer';

/**
 * reducer
 */
export const reducer = combineReducers({
  popup,
  post,
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
export * from './popup/action';
export * from './post/action';
export * from './profile/action';

/**
 * selector
 */
export * from './popup/selector';
export * from './post/selector';
export * from './profile/selector';
