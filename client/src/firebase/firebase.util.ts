import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBKBXUHjuBHIWTQJ8yqm-qjILTT-WA7EAg",
  authDomain: "university-registration-sys.firebaseapp.com",
  projectId: "university-registration-sys",
  storageBucket: "university-registration-sys.appspot.com",
  messagingSenderId: "461296675600",
  appId: "1:461296675600:web:5e94951a8342d1bd70d395",
  measurementId: "G-YFJ0K7VL2K"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export {
  firestore,
  auth
};
