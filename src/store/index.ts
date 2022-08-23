import create from 'zustand';

/** Auth */
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { auth } from '../service/firebase';

const provider = new GoogleAuthProvider();

interface UserState {
  user: Pick<User, 'uid' | 'email' | 'photoURL'> | null;
  login: () => void;
  logout: () => void;
}

export const useUserStore = create<UserState>(set => ({
  user: null,
  login: () => {
    signInWithPopup(auth, provider).then(result =>
      set(() => ({ user: result.user }))
    );
  },
  logout: async () => {
    await auth.signOut();
    set(() => ({ user: null }));
  }
}));

auth.onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    useUserStore.setState(() => ({ user: firebaseUser }));
  } else {
    useUserStore.setState(() => ({
      user: null
    }));
  }
});
