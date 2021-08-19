import firebase from "firebase";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCq1tFyMqSEF34Zh2OHvhZDOPrFIOHQVOo",
  authDomain: "e-medic-trial.firebaseapp.com",
  projectId: "e-medic-trial",
  storageBucket: "e-medic-trial.appspot.com",
  messagingSenderId: "66300028561",
  appId: "1:66300028561:web:9086b682accf8e10ba0130",
  measurementId: "G-P410FDP065",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
