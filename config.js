import firebase from 'firebase';
require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyDF76_k1-tLIfUXlaRipAJGzjiVkN5MzY0",
    authDomain: "suicide-attempt.firebaseapp.com",
    projectId: "suicide-attempt",
    storageBucket: "suicide-attempt.appspot.com",
    messagingSenderId: "396903011638",
    appId: "1:396903011638:web:9b8581fb652da315bb8f97"
  };

firebase.initializeApp(firebaseConfig);
export default firebase.firestore();