/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, SetStateAction, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext({ user: null, loading: false });

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: any }> = ( props: any ) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged(
      (res: SetStateAction<null>) => {
        res ? setUser(res) : setUser(null);
        setLoading(false);
        setComplete(true);
      }
    );
    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {complete && props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
