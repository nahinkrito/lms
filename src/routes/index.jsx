import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/auth/Login';
import InstructorDashboard from '../pages/dashboard/InstructorDashboard';
import StudentDashboard from '../pages/dashboard/StudentDashboard';
import CourseDetails from '../pages/courses/CourseDetails';
import CreateCourse from '../pages/courses/CreateCourse';
import MainLayout from '../components/layout/MainLayout';
import DiscussionForum from '../pages/discussions/DiscussionForum';
import AttemptQuiz from '../pages/quiz/AttemptQuiz';
import ProgrammingEnv from '../pages/programming/ProgrammingEnv';

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
        <Route path="courses">
          <Route index element={<Navigate to="/" />} />
          <Route path=":id" element={<CourseDetails />} />
          {user?.role === 'instructor' && (
            <Route path="create\" element={<CreateCourse />} />
          )}
        </Route>
        <Route path="discussions" element={<DiscussionForum />} />
        <Route path="quiz/:id" element={<AttemptQuiz />} />
        <Route path="programming" element={<ProgrammingEnv />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;