import firebase from 'firebase' 
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyAyrlPxtaROnISK7KAkJrsGQ8sr-ses0Dc",
    authDomain: "barteringapp-2b525.firebaseapp.com",
    projectId: "barteringapp-2b525",
    storageBucket: "barteringapp-2b525.appspot.com",
    messagingSenderId: "123718373190",
    appId: "1:123718373190:web:e8006d9334eba0c7611f47"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();