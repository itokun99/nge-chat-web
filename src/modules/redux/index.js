import { combineReducers, createStore, thunk, applyMiddleware } from "libraries";
import post from './post/reducer';
import profile from './profile/reducer';

/**
 * reducer
 */
export const reducer = combineReducers({
  post,
  profile
})

/**
 * store
 */
export const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

/**
 * dispatcher
 */
export * from './post/action';
export * from './profile/action';

/**
 * selector
 */
export * from './post/selector';
export * from './profile/selector';