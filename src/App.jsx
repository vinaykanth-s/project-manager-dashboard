// import { auth } from './firebase/init'
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
// } from 'firebase/auth'
// import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/home/Home'
import EmployeeList from './pages/employees/EmployeeList'
import EditEmployee from './pages/employees/EditEmployee'
import CreateEmployee from './pages/employees/CreateEmployee'

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="employees">
              <Route index element={<EmployeeList />} />
              <Route path=":employeeId" element={<EditEmployee />} />
              <Route path="new" element={<CreateEmployee />} />
            </Route>
            <Route path="projects">
              <Route index element={<EmployeeList />} />
              <Route path=":projectId" element={<EditEmployee />} />
              <Route path="new" element={<CreateEmployee />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
