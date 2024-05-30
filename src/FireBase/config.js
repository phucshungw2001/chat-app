import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, FacebookAuthProvider, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCY4x6qU2jemX4Bh8rJzn417DiM2RxHL3E",
  authDomain: "chat-aap-2e09b.firebaseapp.com",
  projectId: "chat-aap-2e09b",
  storageBucket: "chat-aap-2e09b.appspot.com",
  messagingSenderId: "936753782623",
  appId: "1:936753782623:web:6e88d43a110b81e22860ea",
  measurementId: "G-PNTL73WLVK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);


// if (window.location.hostname === "localhost") {
//   connectAuthEmulator(auth, "http://localhost:9099");
//   connectFirestoreEmulator(db, "localhost", 8080);
// }


export { auth, db, storage }; // Exporting auth and db directly
export default app; // Exporting app as default
