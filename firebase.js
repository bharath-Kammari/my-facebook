import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
const firebaseConfig = {
    apiKey: "AIzaSyBuTiGYgOOtwpKj_1k-Mo7niWdXcwD4fJ8",
    authDomain: "facebook-clone-e55a7.firebaseapp.com",
    projectId: "facebook-clone-e55a7",
    storageBucket: "facebook-clone-e55a7.appspot.com",
    messagingSenderId: "241948577208",
    appId: "1:241948577208:web:0e5926ac4bcfbd1074934d"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
//   const auth=firebase.auth();
  const storage=firebase.storage();
  export {db,storage};