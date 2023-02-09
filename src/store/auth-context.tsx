/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { doc, getDoc } from 'firebase/firestore';
import { createContext, SetStateAction, useContext, useEffect, useState } from 'react';
import { auth, FirestoreDB } from '../firebase';

const AuthContext = createContext({ user: null, admin: false });

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: any }> = ( props: any ) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      async (res: SetStateAction<null>) => {
        res ? setUser(res) : setUser(null);
        await getUserInfo();
        setComplete(true);
      }
    );
    return () => unsubscribe();
  }, [auth]);

  const getUserInfo = async () => {
    if (auth.currentUser !== null) {
      const dbRef = doc(FirestoreDB, 'users', auth.currentUser.email as string);
      const dbSnap = await getDoc(dbRef);
      const userData = dbSnap.data();
      if (userData.admin === true) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    } else {
      setAdmin(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, admin }}>
      {complete && props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
