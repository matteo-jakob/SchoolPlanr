import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import firebaseConfig from "./firebaseconfig";

console.log(firebaseConfig);

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

console.log("End of firebase");

export { firebase, firestore, auth, storage };
