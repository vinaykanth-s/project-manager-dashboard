// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAanGyOpFEhYnNoMZL5PqBP86rA7GWvPNI',
  authDomain: 'project-manager-dashboard.firebaseapp.com',
  projectId: 'project-manager-dashboard',
  storageBucket: 'project-manager-dashboard.appspot.com',
  messagingSenderId: '811746835764',
  appId: '1:811746835764:web:fae3dcef769fa8290f3961',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth()
