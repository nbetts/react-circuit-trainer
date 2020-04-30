const initState = {}

const workoutReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_WORKOUT':
      return {
        ...state,
        workoutError: null
      }
    case 'CREATE_WORKOUT_ERROR':
      return {
        ...state,
        workoutError: action.errorMessage
      }
    default:
      return state;
  }
}

export default workoutReducer;