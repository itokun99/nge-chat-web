import actionType from './actionType';

const initialState = {
  all: [],
  filterText: ''
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
    default:
      return state;
  }
};

export default user;
