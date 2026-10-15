import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, usuarios, credenciaisTeste } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, senha: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sgd_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, senha: string) => {
    const credencial = credenciaisTeste.find(c => c.email === email && c.senha === senha);
    if (credencial) {
      const foundUser = usuarios.find(u => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('sgd_user', JSON.stringify(foundUser));
        return { success: true };
      }
    }
    return { success: false, error: 'E-mail ou senha inválidos.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sgd_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
