import { createContext, useContext } from 'react';
import { RegistrationType } from '../Types/User.type';

export type AuthContextProps = {
  user: RegistrationType | null;
  isAuthenticated?: boolean;
  isLoading?: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => undefined,
  logout: () => undefined,
});

export const { Provider: AuthProvider, Consumer: AuthConsumer } = AuthContext;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      '`useAuth` hook must be used within a `AuthProvider` component'
    );
  }

  return context;
};
