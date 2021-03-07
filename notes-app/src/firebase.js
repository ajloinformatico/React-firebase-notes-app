import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'
//firebase and firestore imports

// FIREBASE CONST APP CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyDkQ0Rn37E8YF2y7_l-HlWtElB2tJBb0nw",
    authDomain: "react-notes-8b860.firebaseapp.com",
    projectId: "react-notes-8b860",
    storageBucket: "react-notes-8b860.appspot.com",
    messagingSenderId: "153994697474",
    appId: "1:153994697474:web:7883b8f02461b76a8e001b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore()
  const auth = firebase.auth()

  export {firebase, db, auth}