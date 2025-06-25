import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp, auth } from './firebaseConfig';




const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth(firebaseApp);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u || null));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
