import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

import { LoginCredentials, User } from '../../models/user';
import api from '../../services/api';

export type AuthState = {
  user: User;
};

export type AuthContextData = {
  user: User;
  signIn(credentials: LoginCredentials): Promise<void>;
  signOut(): void;
};

export type AuthProviderParams = {
  children: ReactNode;
};

export const cleanStorage = (): void => {
  localStorage.removeItem('user');
};

export const handleToken = (token: string): void => {
  api.defaults.headers.common['X-JWT'] = token;
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderParams): JSX.Element => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    const token = parsedUser?.token;

    if (token && user) {
      handleToken(token);

      return { user: parsedUser };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: LoginCredentials) => {
    const response = await api.post<User>('/user/login', {
      email,
      password,
    });

    const { token } = response.data;
    const user = response.data;

    localStorage.setItem('user', JSON.stringify(user));

    handleToken(token);

    setData({ user });
  }, []);

  const signOut = useCallback(() => {
    cleanStorage();

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => useContext(AuthContext);

export { AuthProvider, useAuth };
