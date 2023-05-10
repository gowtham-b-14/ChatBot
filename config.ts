import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByS4eLmf3wD-qXy_51SNbXkbc8cy6Xhr4",
  authDomain: "openai-auth-911e1.firebaseapp.com",
  projectId: "openai-auth-911e1",
  storageBucket: "openai-auth-911e1.appspot.com",
  messagingSenderId: "112795452396",
  appId: "1:112795452396:web:b44b39daa7d2256398b6c9",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
