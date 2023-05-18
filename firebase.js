import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
  apiKey: "AIzaSyAuiDIH5pONfbQtA4LRQXw9emsqJOLoaDU",
  authDomain: "skientia.firebaseapp.com",
  databaseURL: "https://skientia-default-rtdb.firebaseio.com",
  projectId: "skientia",
  storageBucket: "skientia.appspot.com",
  messagingSenderId: "287227600138",
  appId: "1:287227600138:web:d810840f48dc180799aef3",
  measurementId: "G-L6NGBMG8CF"
};


const app = initializeApp(firebaseConfig);



const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
export default app;