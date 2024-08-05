
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCqJ14x5HLE1lU1yfC4W5ZYYKcxRrMkYEw",
    authDomain: "todoapp-f9835.firebaseapp.com",
    projectId: "todoapp-f9835",
    storageBucket: "todoapp-f9835.appspot.com",
    messagingSenderId: "727997365030",
    appId: "1:727997365030:web:e6ef8705096c486e895fe7"
};


const app = initializeApp(firebaseConfig);
const FIRESTORE_DB = getFirestore(app);

export { FIRESTORE_DB };
