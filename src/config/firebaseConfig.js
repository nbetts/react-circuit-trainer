import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxPCvyzct6F1r3_QZixR4Bze6HRocWrvU",
  authDomain: "react-circuit-trainer.firebaseapp.com",
  databaseURL: "https://react-circuit-trainer.firebaseio.com",
  projectId: "react-circuit-trainer",
  storageBucket: "react-circuit-trainer.appspot.com",
  messagingSenderId: "480054245897",
  appId: "1:480054245897:web:c7a5683f38c08835fa16d8",
  measurementId: "G-FY8116Y2TZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
firebase.firestore();

export default firebase;