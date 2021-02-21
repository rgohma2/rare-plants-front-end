import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
apiKey: "AIzaSyCkzKqqIYAQaWMA0XBX0hYcb_2nvls7laI",
authDomain: "rare-plants-35a06.firebaseapp.com",
projectId: "rare-plants-35a06",
storageBucket: "rare-plants-35a06.appspot.com",
messagingSenderId: "945735654028",
appId: "1:945735654028:web:03ca5bb50c7395e0efb9a9",
measurementId: "G-2C2SL1K08B"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()


export {storage, firebase}