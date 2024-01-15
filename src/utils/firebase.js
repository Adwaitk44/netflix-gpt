// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn1Qvhz7YCN25stvEVKO1Yo6bc-ezwLv0",
  authDomain: "netflixgpt-3a6b9.firebaseapp.com",
  projectId: "netflixgpt-3a6b9",
  storageBucket: "netflixgpt-3a6b9.appspot.com",
  messagingSenderId: "510494625901",
  appId: "1:510494625901:web:41911c0e2a0e7a073f6f64",
  measurementId: "G-2X19ZNW9PJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth();