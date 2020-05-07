import actionType from './actionType';

const initialState = {
  data: [],
  selectedPost: null
}


const post = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_POSTS:
      return {
        ...state,
        data: action.value
      }
    case actionType.SET_POST:
      return {
        ...state,
        selectedPost: action.value
      }
    default:
      return state
  }
}

export default post;