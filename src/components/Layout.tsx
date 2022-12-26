/** Hooks */
import { useUserStore } from '../store';

/** Components */
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Login } from './Login';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const Layout = () => {
  const user = useUserStore(state => state.user);

  return (
    <>
      <Header />
      {user ? <Outlet /> : <Login />}
      <ToastContainer />
    </>
  );
};
