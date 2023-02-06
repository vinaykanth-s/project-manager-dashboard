import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/home/Home'
import EmployeeList from './pages/employees/list/EmployeeList'
import EmployeeData from './pages/employees/single/EmployeeData'
import CreateEmployee from './pages/employees/create/CreateEmployee'
import { projectInputs, userInputs } from './formSource'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import ProjectList from './pages/projects/list/ProjectList'
import CreateProject from './pages/projects/create/CreateProject'
import ProjectData from './pages/projects/single/ProjectData'
const App = () => {
  const { currentUser } = useContext(AuthContext)
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />
  }

  console.log({ currentUser })

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="employees">
              <Route
                index
                element={
                  <RequireAuth>
                    <EmployeeList />
                  </RequireAuth>
                }
              />
              <Route
                path=":employeeId"
                element={
                  <RequireAuth>
                    <EmployeeData />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <CreateEmployee
                      inputs={userInputs}
                      title="Add New Employee"
                    />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="projects">
              <Route
                index
                element={
                  <RequireAuth>
                    <ProjectList />
                  </RequireAuth>
                }
              />
              <Route
                path=":projectId"
                element={
                  <RequireAuth>
                    <ProjectData />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <CreateProject
                      inputs={projectInputs}
                      title="Add New Project"
                    />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
