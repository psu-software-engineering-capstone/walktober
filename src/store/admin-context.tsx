/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { doc, onSnapshot } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { FirestoreDB } from '../firebase';

const AdminContext = createContext({
  maxSize: 0,
  minSize: 0,
  regDate: '',
  teamDate: '', 
  startDate: '', 
  endDate: '',
  priorLogDays: 0
});

export const useAdminContext = () => useContext(AdminContext);

export const AdminContextProvider: React.FC<{ children: any }> = ( props: any ) => {
  const [maxSize, setMax] = useState(0);
  const [minSize, setMin] = useState(0);
  const [regDate, setRegDate] = useState("");
  const [teamDate, setTeamDate] = useState("");
  const [startDate, setStart] = useState("");
  const [endDate, setEnd] = useState("");
  const [priorLogDays, setPriorLogDays] = useState(0);
  const [complete, setComplete] = useState(false);

  // update admin settings whenever there is an update in firestore database
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(FirestoreDB, "admin", "admin"), (doc: any) => {
      setMax(doc.data().max_team_size as number);
      setMin(doc.data().min_team_size as number);
      setRegDate(doc.data().registration_deadline + "T23:59");
      setTeamDate(doc.data().team_creation_due + "T23:59");
      setStart(doc.data().event_start_date + "T00:00");
      setEnd(doc.data().event_end_date + "T23:59");
      setPriorLogDays(doc.data().prior_log_days);
      setComplete(true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AdminContext.Provider value={{ endDate, maxSize, minSize, regDate, startDate, teamDate, priorLogDays }}>
      {complete && props.children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
