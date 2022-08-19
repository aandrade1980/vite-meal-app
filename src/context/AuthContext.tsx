import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react';

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User
} from 'firebase/auth';

import { useNavigate } from 'react-router-dom';

import { auth } from '../service/firebase';

type authContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  user: null,
  login: () => {},
  logout: () => {}
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const provider = new GoogleAuthProvider();

  const login = () => {
    signInWithPopup(auth, provider)
      .then(result =>
        // The signed-in user info.
        setUser(result.user)
      )
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error({ errorCode, errorMessage, email, credential });
        setUser(null);
      });
  };

  const logout = () => {
    auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user);

      user ? navigate('/') : navigate('/login');
    });
  }, []);

  const value = {
    user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
