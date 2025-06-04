import { useAuth } from '../../context/AuthContext';

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Welcome back, {user?.name}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">My Courses</h2>
          <p className="text-gray-600">No courses enrolled yet</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Upcoming Quizzes</h2>
          <p className="text-gray-600">No upcoming quizzes</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <p className="text-gray-600">No recent activities</p>
        </div>
      </div>
    </div>
  );
}