import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCVzuaTWgqS4hiv3_QNR_eggJWEEpbleSo",
  authDomain: "mybooklog-505bf.firebaseapp.com",
  projectId: "mybooklog-505bf",
  storageBucket: "mybooklog-505bf.appspot.com",
  messagingSenderId: "193847719678",
  appId: "1:193847719678:web:14ebb06c888d58049a97af"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export default firebase;