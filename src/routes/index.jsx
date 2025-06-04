import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/auth/Login';
import InstructorDashboard from '../pages/dashboard/InstructorDashboard';
import StudentDashboard from '../pages/dashboard/StudentDashboard';
import MainLayout from '../components/layout/MainLayout';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={
        user ? <Navigate to="/" /> : <Login />
      } />
      
      <Route path="/" element={
        <PrivateRoute>
          <MainLayout />
        </PrivateRoute>
      }>
        <Route index element={
          user?.role === 'instructor' ? 
            <InstructorDashboard /> : 
            <StudentDashboard />
        } />
        {/* Other routes will be added here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;