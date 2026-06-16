import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const STORAGE_KEY = 'dt_admin_token';

interface AdminAuthContextType {
  isAdmin: boolean;
  token: string | null;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAdmin: false,
  token: null,
  login: async () => false,
  logout: async () => {},
});

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    fetch('/api/admin/verify', {
      headers: { 'x-admin-token': stored },
    }).then(res => {
      if (res.ok) {
        setToken(stored);
        setIsAdmin(true);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }).catch(() => localStorage.removeItem(STORAGE_KEY));
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) return false;
      const { token: newToken } = await res.json();
      localStorage.setItem(STORAGE_KEY, newToken);
      setToken(newToken);
      setIsAdmin(true);
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      fetch('/api/admin/logout', {
        method: 'POST',
        headers: { 'x-admin-token': stored },
      }).catch(() => {});
    }
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setIsAdmin(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, token, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
