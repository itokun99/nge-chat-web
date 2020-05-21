import actionType from './actionType';

const initialState = {
  title: '', // title of popup
  description: '', // description of popup
  onClickButton: null, // action button primary in popup
  show: false, // handle for visibility
  buttonTitle: 'ok', // button primary title
  buttonSecondTitle: 'batal', // button secondary title
  customButton: null, // a custom component for button
  showSecondButton: false, // handle for visibility button secondary
  onClickSecondButton: null // action button secondary
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
