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
    documentId: document.id,
    user: workout.authorName,
    time: admin.firestore.FieldValue.serverTimestamp(),
    category: 'workout',
    content: 'added a new workout',
  }

  return createNotification(notification);
});

exports.userCreated = functions.auth.user().onCreate(user => {
  return admin.firestore().collection('users').doc(user.uid).get().then((document) => {
    const user = document.data();
    const notification = {
      documentId: document.id,
      user: user.name,
      time: admin.firestore.FieldValue.serverTimestamp(),
      category: 'user',
      content: 'signed up',
    }

    return createNotification(notification);
  });
});