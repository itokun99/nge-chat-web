import { store, setPopup, clearPopup } from 'modules';

const { dispatch } = store;
const state = store.getState();

export const showPopup = (payload = {}) => {
  const { popup } = state;
  if (popup.show) {
    dispatch(clearPopup());
  }
  dispatch(setPopup({ ...payload, show: true }));
  return payload;
};

export const hidePopup = () => {
  dispatch(clearPopup());
  return true;
};
