import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const AppRouter = () => {

  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
    return isAuthenticated ? children: <Navigate to="/login" replace/>;
  };

  const PublicRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
    // Si ya está logueado y trata de ir al /login, mándalo al dashboard
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
  };


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>}>
      </Route>
      <Route path='*' element={<Navigate to="/login" />}></Route> 
    </Routes>
  )
}

export default AppRouter