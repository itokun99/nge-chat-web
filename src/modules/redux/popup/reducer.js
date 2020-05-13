import actionType from './actionType';

const initialState = {
  title: '',
  description: '',
  onClickButton: null,
  show: false,
  buttonTitle: 'ok',
  customButton: null
};

const popup = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_POPUP:
      return {
        ...state,
        ...action.value
      };
    case actionType.CLEAR_POPUP:
      return initialState;
    default:
      return state;
  }
};

export default popup;
