const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const createNotification = (notification) => {
  return admin.firestore().collection('notifications').add(notification);
}

exports.workoutCreated = functions.firestore.document('workouts/{workoutId}').onCreate(document => {
  const workout = document.data();
  const notification = {
    content: 'Added a new workout',
    user: workout.authorFirstName + ' ' + workout.authorLastName,
    time: admin.firestore.FieldValue.serverTimestamp()
  }

  return createNotification(notification);
});

exports.userCreated = functions.auth.user().onCreate(user => {
  return admin.firestore().collection('users').doc(user.uid).get().then((document) => {
    const user = document.data();
    const notification = {
      content: 'Added a new user',
      user: user.firstName + ' ' + user.lastName,
      time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification);
  });
});