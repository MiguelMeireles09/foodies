// services/AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Lógica para login bem-sucedido
    setIsAuthenticated(true);
  };

  const signup = () => {
    // Lógica para cadastro bem-sucedido
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Lógica para logout
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
