import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonItem,
    IonPage,
    IonRow,
    IonTitle,
  } from '@ionic/react';
  import NavBar from '../../components/NavBar';
  import { useContext, useEffect, useState } from 'react';
  import AuthContext from '../../store/auth-context';
  import { useHistory } from 'react-router-dom';
  import { FirestoreDB } from '../../firebase';
  import { collection, getDocs } from 'firebase/firestore';
  
  const TeamSelection: React.FC = () => {
    interface TeamLog {
      team: string;
      teamLead: string;
      public: boolean;
      totalMembers: number;
    }
  
    const [fullTeamData, setFullTeamData] = useState<TeamLog[]>([]);
  
    const loadTeamData = async () => {
      const dbRef = collection(FirestoreDB, 'teams');
      const dbSnap = await getDocs(dbRef);
      const fullTeamData: TeamLog[] = [];
      dbSnap.forEach((doc: { data: () => any; }) => {
        const data = doc.data();
        if (data) {
          const teamData: TeamLog = {
            team: data.name,
            teamLead: data.leader,
            public: data.status,
            totalMembers: data.members,
          };
          fullTeamData.push(teamData);
        }
      });
      setFullTeamData(fullTeamData);
    };
  
    const history = useHistory();
    const ctx = useContext(AuthContext);
    const isAdmin = ctx.admin;
    
    // prevents the user from entering the admin page from the url if they are not an admin
    if(isAdmin === false){
      history.push('/app');
      return;
    }
  
    useEffect(() => {
      loadTeamData();
    }, []);
  
    //creates the grid, if the sample data has users in the individual data collection, it pulls the relevant information
    //and adds it into rows
    function DisplayUsers(userLogs: TeamLog[]): any {
      if (userLogs.length > 0) {
        return (
          <>
            <IonGrid fixed={true}>
                <IonRow>
                    <IonCol size-md="2" className="team-selection-col">
                    Team Name
                    </IonCol>
                    <IonCol size-md="2" className="team-selection-col">
                    Team Leader
                    </IonCol>
                    <IonCol size-md="2" className="team-selection-col">
                    Public/Private
                    </IonCol>
                    <IonCol size-md="2" className="team-selection-col">
                    Team Members
                    </IonCol>
                    <IonCol size-md="2" className="team-selection-col">
                    Actions
                    </IonCol>
                </IonRow>
  
              {userLogs.map((item: { team: any; teamLead: any; public: any; totalMembers: any; }) => (
                <IonRow key={Math.random()}>
                  <IonCol size-md="2">{item.team}</IonCol>
                  <IonCol size-md="2">{item.teamLead}</IonCol>
                  <IonCol size-md="2">{item.public == 1 ? "Yes" : "No"}</IonCol>
                  <IonCol size-md="2">{item.totalMembers.length}</IonCol>
                  <IonCol size-md="2">
                    {item.public == 1 ? <IonButton size="small">Join Team</IonButton> : ''}
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </>
        );
      } else {
        return (
          <>
            <IonGrid fixed={true}>
              <IonRow class="header-row">
                <IonCol size-md="2" className="team-selection-col">
                  Team Name
                </IonCol>
  
                <IonCol size-md="2" className="team-selection-col">
                  Team Leader
                </IonCol>
  
                <IonCol size-md="2" className="team-selection-col">
                  Public / Private
                </IonCol>
  
                <IonCol size-md="2" className="team-selection-col">
                  Team Members
                </IonCol>
  
                <IonCol size-md="2" className="team-selection-col">
                  Actions
                </IonCol>
              </IonRow>
            </IonGrid>
          </>
        );
      }
    }
  
    return (
      <IonPage>
        <IonHeader>
          <NavBar>
            <IonTitle>Team Selection</IonTitle>
          </NavBar>
        </IonHeader>
        <IonContent fullscreen class='team-selection'>
          <IonItem>{DisplayUsers(fullTeamData)}</IonItem>
    </IonContent>
    </IonPage>
    ) as any;
  };
  
  export default TeamSelection;