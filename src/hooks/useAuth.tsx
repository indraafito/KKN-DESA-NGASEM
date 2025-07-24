
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isAdminLoggedIn');
      const loginTime = localStorage.getItem('adminLoginTime');
      
      if (loginStatus === 'true' && loginTime) {
        const currentTime = new Date().getTime();
        const sessionTime = parseInt(loginTime);
        const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
        
        if (currentTime - sessionTime < sessionDuration) {
          setIsAuthenticated(true);
        } else {
          // Session expired
          localStorage.removeItem('isAdminLoggedIn');
          localStorage.removeItem('adminLoginTime');
          setIsAuthenticated(false);
        }
      }
    };

    checkLoginStatus();
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === 'desangasem' && password === 'majumakmur') {
      setIsAuthenticated(true);
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('adminLoginTime', new Date().getTime().toString());
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminLoginTime');
  };

  const checkAuth = (): boolean => {
    return isAuthenticated;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
