import { auth } from './firebase/init'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { useState } from 'react'

const App = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})
  const registerUser = () => {
    createUserWithEmailAndPassword(auth, 'admin@demo.com', 'test123')
      .then(({ user }) => console.log(user))
      .catch((err) => console.log(err))
  }
  const loginUser = () => {
    setLoading(true)
    // console.log('login')
    signInWithEmailAndPassword(auth, 'admin@demo.com', 'test123')
      .then(({ user }) => setUser(user))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }
  const logoutUser = () => {
    signOut(auth)
    setUser(null)
  }
  return (
    <div>
      <button onClick={registerUser}>Register</button>
      <button onClick={loginUser}>Login</button>
      <button onClick={logoutUser}>Logout</button>
      {loading ? 'loading...' : user?.email}
    </div>
  )
}

export default App
