const initState = {}

const workoutReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_WORKOUT':
      return state;
    case 'CREATE_WORKOUT_ERROR':
      console.log('create workout error', action.error);
      return state;
    default:
      return state;
  }
}

export default workoutReducer;