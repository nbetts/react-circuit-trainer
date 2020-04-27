import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore'
import firebase from 'firebase/app'
import firebaseConfig from './config/firebaseConfig'
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App.jsx';
import rootReducer from './store/reducers/rootReducer'

const store = createStore(rootReducer,
  compose(
    reduxFirestore(firebaseConfig),
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
  )
);

const userProfileConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
}

const reactReduxFirebaseProps = {
  firebase,
  config: firebaseConfig,
  config: userProfileConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
