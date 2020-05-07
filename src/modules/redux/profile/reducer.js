import actionType from './actionType';


const initialState = {}

const profile = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_PROFILE:
      return {
        ...state,
        ...action.value
      }
    default:
      return state
  }
}

export default profile;