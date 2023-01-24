/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, SetStateAction, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext({ user: null, loading: false });

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: any }> = ( props: any ) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(
      auth,
      (res: SetStateAction<null>) => {
        res ? setUser(res) : setUser(null);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
