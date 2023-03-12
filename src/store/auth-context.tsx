/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { onSnapshot } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { createContext, SetStateAction, useContext, useEffect, useState } from 'react';
import { auth, FirestoreDB } from '../firebase';

const AuthContext = createContext({ user: null, team: '', admin: false });
console.log(AuthContext);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: any }> = ( props: any ) => {
  const [user, setUser] = useState(null);
  const [team, setTeam] = useState('');
  const [admin, setAdmin] = useState(false);
  const [complete, setComplete] = useState(false);

  // team state change listener
  useEffect(() => {
    if (auth.currentUser !== null) {
      const unsubscribe = onSnapshot(doc(FirestoreDB, "users", auth.currentUser.email as string), (doc: any) => {
        setTeam(doc.data().team);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [auth.currentUser]);
  
  // auth state change listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      async (res: SetStateAction<null>) => {
        res ? setUser(res) : setUser(null); // if user is logged in, set user to the user object, otherwise set user to null
        await getAdminInfo(); // get admin info from firestore database
        setComplete(true); // set complete to true to render the children components
      }
    );
    return () => {
      unsubscribe();
    };
  }, [auth]);

  // get admin info from firestore database
  const getAdminInfo = async () => {
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
    <AuthContext.Provider value={{ user, team, admin }}>
      {complete && props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
