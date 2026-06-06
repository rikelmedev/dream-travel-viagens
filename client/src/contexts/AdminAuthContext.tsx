import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const STORAGE_KEY = 'dt_admin_auth';
const ADMIN_PASSWORD = 'DreamTravel@2026';

interface AdminAuthContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAdmin: false,
  login: () => false,
  logout: () => {},
});

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem(STORAGE_KEY) === 'true');
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAdmin(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
