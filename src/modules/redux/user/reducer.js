import actionType from './actionType';

const initialState = {
  all: [],
  filterText: '',
  contacts: []
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_USERS:
      return {
        ...state,
        all: action.value
      };
    case actionType.CLEAR_USERS:
      return {
        ...state,
        all: initialState.all
      };
    case actionType.SET_USER_FILTER:
      return {
        ...state,
        filterText: action.value
      };

    case actionType.SET_USER_CONTACT:
      return {
        ...state,
        contacts: action.value
      };
    case actionType.CLEAR_USER_CONTACT:
      return {
        ...state,
        contacts: initialState.contacts
      };
    default:
      return state;
  }
};

export default user;
