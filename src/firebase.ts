// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcYTi5dgw0cjQtAFLqQUfvPfsljQ3jRkQ",
  authDomain: "drvynin-d0c73.firebaseapp.com",
  projectId: "drvynin-d0c73",
  storageBucket: "drvynin-d0c73.appspot.com",
  messagingSenderId: "316617020168",
  appId: "1:316617020168:web:ad780796af3037d1fe52bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier };