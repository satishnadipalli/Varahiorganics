import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCeFsZ23HOLucNK31Ck56mb8nnPIxEXJoQ",
  authDomain: "varahi-organic-s.firebaseapp.com",
  projectId: "varahi-organic-s",
  storageBucket: "varahi-organic-s.firebasestorage.app",
  messagingSenderId: "744149711153",
  appId: "1:744149711153:web:08eed9a0cc544126d81810",
  measurementId: "G-2XRTYXFVPC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

