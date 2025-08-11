import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Login from './pages/Login'
import Main from './pages/Main'
import './App.css'

function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route 
        path="/login" 
        element={user ? <Navigate to="/" /> : <Login />}
      />
      <Route 
        path="/" 
        element={user ? <Main /> : <Navigate to="/login" />}
      />
    </Routes>
  )
}

export default App
