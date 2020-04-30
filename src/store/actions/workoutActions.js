import { createWorkoutSchema } from '../schemas/workout.schemas'

export const createWorkout = (workout) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const { error } = createWorkoutSchema.validate(workout);

    if (error) {
      dispatch({ type: 'CREATE_WORKOUT_ERROR', errorMessage: error.message })
      return;
    }

    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection('workouts').add({
      ...workout,
      authorName: profile.name,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_WORKOUT', workout })
    }).catch((error) => {
      dispatch({ type: 'CREATE_WORKOUT_ERROR', error })
    })
  }
}
