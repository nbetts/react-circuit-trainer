const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        authError: null
      }
    case 'SIGN_IN_ERROR':
      return {
        ...state,
        authError: action.errorMessage
      }
    case 'SIGN_OUT_SUCCESS':
      return state;
    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        authError: null
      }
    case 'SIGN_UP_ERROR':
      return {
        ...state,
        authError: action.errorMessage
      }
    default:
      return state;
  }
}

export default authReducer;