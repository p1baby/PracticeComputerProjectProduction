import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCr9wnui3XmoCO6vr3Xr8DKaj4pUVvP1Gc",
  authDomain: "practicecomputerproject-60975.firebaseapp.com",
  projectId: "practicecomputerproject-60975",
  storageBucket: "practicecomputerproject-60975.firebasestorage.app",
  messagingSenderId: "971880740950",
  appId: "1:971880740950:web:0da9de7995cb45e72a63f7",
  measurementId: "G-WKT08M0CNJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
