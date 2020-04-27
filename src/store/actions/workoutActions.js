export const createWorkout = (workout) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection('workouts').add({
      ...workout,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_WORKOUT', workout })
    }).catch((error) => {
      dispatch({ type: 'CREATE_WORKOUT_ERROR', error })
    })
  }
}
