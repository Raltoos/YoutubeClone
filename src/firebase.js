import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCD8E1s5TGCYoyiGpw1hzU31n80R2T_JaI",
    authDomain: "clone-d78b7.firebaseapp.com",
    projectId: "clone-d78b7",
    storageBucket: "clone-d78b7.appspot.com",
    messagingSenderId: "632802604434",
    appId: "1:632802604434:web:65de3c95a12a06859cfd4b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };