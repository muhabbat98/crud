import React from 'react';
import { useContext, useState, createContext } from 'react';

interface valueProps {
  user: any;
  setUser?: any;
}
const AuthContext = createContext<valueProps>({ user: null, setUser: null });

interface authProps {
  sign: string;
  key: string;
}

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<authProps>({
    sign: localStorage.getItem('sign') || '',
    key: localStorage.getItem('key') || ''
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <AuthContext.Consumer>{() => children}</AuthContext.Consumer>
    </AuthContext.Provider>
  );
};
const useAuth = (setternOnly: boolean) => {
  const { user, setUser } = useContext(AuthContext);
  return setternOnly ? [setUser] : [user, setUser];
};
export { useAuth, AuthProvider };
