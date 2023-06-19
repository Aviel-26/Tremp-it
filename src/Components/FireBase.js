// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7JzzQ052eIGeeo7gXO5bInKL20dM3ZEY",
  authDomain: "tremp-it-152b4.firebaseapp.com",
  projectId: "tremp-it-152b4",
  storageBucket: "tremp-it-152b4.appspot.com",
  messagingSenderId: "443202569619",
  appId: "1:443202569619:web:fca5a7983f083c77425466"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const store = getFirestore(app);

export {auth, app, analytics,store}