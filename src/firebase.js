// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// 🔐 아래 설정값들을 본인 Firebase 콘솔에서 복사해와서 넣기!
const firebaseConfig = {
  apiKey: "AIzaSyCSqA0Dpb8nFae6I4lh6z4yQNtY41xQtyI",
  authDomain: "yweb-wedding.firebaseapp.com",
  projectId: "yweb-wedding",
  storageBucket: "yweb-wedding.firebasestorage.app",
  messagingSenderId: "154076000516",
  appId: "1:154076000516:web:46b3b5a6ce1b4698f92051",
  measurementId: "G-KHYEDC8NX8",
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Storage 불러오기
export const storage = getStorage(app);
