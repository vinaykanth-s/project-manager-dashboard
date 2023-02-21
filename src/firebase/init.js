import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

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
export const db = getFirestore(app)
export const storage = getStorage(app)
