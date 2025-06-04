import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Dummy credentials for testing
const DUMMY_CREDENTIALS = {
  instructor: {
    email: 'instructor@test.com',
    password: 'instructor123',
    name: 'John Smith',
    role: 'instructor'
  },
  student: {
    email: 'student@test.com',
    password: 'student123',
    name: 'Jane Doe',
    role: 'student'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      // Simulate API call with dummy credentials
      const matchedUser = Object.values(DUMMY_CREDENTIALS).find(
        (user) => user.email === credentials.email && 
                  user.password === credentials.password
      );

      if (!matchedUser) {
        throw new Error('Invalid credentials');
      }

      // In real implementation, this would be handled by Supabase Auth
      setUser(matchedUser);
      return matchedUser;
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // In real implementation, this would call Supabase Auth signOut
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};