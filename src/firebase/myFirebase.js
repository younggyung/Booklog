import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVzuaTWgqS4hiv3_QNR_eggJWEEpbleSo",
  authDomain: "mybooklog-505bf.firebaseapp.com",
  projectId: "mybooklog-505bf",
  storageBucket: "mybooklog-505bf.appspot.com",
  messagingSenderId: "193847719678",
  appId: "1:193847719678:web:14ebb06c888d58049a97af"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default app;
export {auth, db};