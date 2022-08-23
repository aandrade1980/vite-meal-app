import { ReactNode } from 'react';

/** Hooks */
import { useUserStore } from '../store';

/** Components */
import { Login } from './Login';

export const Auth = (component: ReactNode) => {
  const user = useUserStore(state => state.user);

  return user ? component : <Login />;
};
