import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCTKaTnNGV73FWJOoB84Oniz4b9-HbhlXw",
    authDomain: "movie-sharper.firebaseapp.com",
    projectId: "movie-sharper",
    storageBucket: "movie-sharper.firebasestorage.app",
    messagingSenderId: "575419814056",
    appId: "1:575419814056:web:96649843ba522b959b329d"
  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
