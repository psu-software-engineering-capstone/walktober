import { Redirect, Route } from 'react-router-dom';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  isPlatform
} from '@ionic/react';
import {
  home,
  person,
  footsteps,
  fitness,
  people,
  construct
} from 'ionicons/icons';

/* Pages */
import HomePage from './pages/homePage/homePage';
import Profile from './pages/profile/profile';
import newPassword from './pages/profile/newPassword';
import ManualSteps from './pages/manualLoggingSteps/manualLoggingSteps';
import HealthApp from './pages/healthApp/healthApp';
import TeamHome from './pages/teamHome/teamHome';
import TeamJoin from './pages/teamHome/teamJoin';
import TeamCreation from './pages/teamCreation/teamCreation';
import Admin from './pages/admin/admin';
import StepsCalculator from './pages/stepsCalculator/stepsCalculator';

/* Theming */
import './theme/app.scss';

/* Context */
import { useContext, useEffect, useState } from 'react';
import AuthContext from './store/auth-context';
import landing404 from './pages/404landing/landing404';
import AdminSteps from './pages/adminSteps/adminSteps';
import { onSnapshot } from 'firebase/firestore';
import { auth, FirestoreDB } from './firebase';
import { doc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

interface StepLog {
  date: string;
  steps: number;
}

interface userData {
  email: string;
  name: string;
  badges: string[];
  device: string;
  totalStep: number;
  profile_pic: string;
  team: string;
  team_leader: boolean;
  stepsByDate: StepLog[];
  admin: boolean;
}

interface teamData {
  name: string;
  avg_steps: number;
  leader: string;
  members: string[];
  status: string;
  password: string;
  profile_pic: string;
  totalStep: number;
  channel_id: string;
}

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<userData | null>(null); // user data
  const [teamData, setTeamData] = useState<teamData | null>(null); // team data
  const [teamListData, setTeamListData] = useState<Array<teamData> | null>(null); // team list data

  const ctx = useContext(AuthContext); // auth context

  // get user data from firestore
  useEffect(() => {
    if (ctx.user) {
      const unsubscribe = onSnapshot(
        doc(FirestoreDB, 'users', auth.currentUser.email as string),
        (doc: any) => {
          if (doc.exists()) {
            setUserData(doc.data());
          }
        }
      );
      return unsubscribe;
    }
  }, [ctx.user]);

  // get a team data from firestore
  useEffect(() => {
    if (userData && ctx.team !== '') {
      const unsubscribe = onSnapshot(
        doc(FirestoreDB, 'teams', ctx.team),
        (doc: any) => {
          if (doc.exists()) {
            setTeamData(doc.data());
          }
        }
      );
      return unsubscribe;
    }
  }, [userData]);

  // get a team list from firestore
  useEffect(() => {
    if (userData) {
      const unsubscribe = onSnapshot(
        collection(FirestoreDB, 'teams'),
        (querySnapshot: any) => {
          setTeamListData(querySnapshot.docs.map((doc: any) => doc.data()));
        }
      );
      return unsubscribe;
    }
  }, [userData]);

  const tabsVisible = isPlatform('android') || isPlatform('ios'); // check if platform is android or ios

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/" component={landing404}></Route>
        <Route
          exact
          path="/app/home"
          render={(props) => <HomePage {...props} HomeData={userData} />}
        />
        <Route
          exact
          path="/app/profile"
          render={(props) => <Profile {...props} ProfileData={userData} />}
        />
        <Route
          exact
          path="/app/profile/passwordChange"
          component={newPassword}
        />
        <Route
          exact
          path="/app/manualsteps"
          render={(props) => <ManualSteps {...props} StepsLogData={userData} />}
        />
        <Route exact path="/app/stepscalc" component={StepsCalculator} />
        <Route exact path="/app/healthapp" component={HealthApp} />
        <Route
          exact
          path="/app/teamcreation"
          render={(props) => <TeamCreation {...props} TeamCreationData={userData} />}
        />
        <Route
          exact
          path="/app/team"
          render={(props) => <TeamHome {...props} TeamHomeTeam={teamData} TeamHomeUser={userData} />}
        />
        <Route
          exact
          path="/app/team/join"
          render={(props) => <TeamJoin {...props} TeamJoinTeamList={teamListData} TeamJoinUser={userData} />}
        />
        <Route exact path="/app/admin" component={Admin} />
        <Route exact path="/app/adminSteps" component={AdminSteps} />
        <Route exact path="/app">
          <Redirect to="/app/home" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom" className={tabsVisible ? '' : 'hidden'}>
        <IonTabButton tab="home" href="/app/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/app/profile">
          <IonIcon icon={person} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
        <IonTabButton tab="manualsteps" href="/app/manualsteps">
          <IonIcon icon={footsteps} />
          <IonLabel>Steps Log</IonLabel>
        </IonTabButton>
        <IonTabButton tab="healthapp" href="/app/healthapp">
          <IonIcon icon={fitness} />
          <IonLabel>Health App</IonLabel>
        </IonTabButton>
        <IonTabButton
          tab="team"
          href={ctx.team === '' ? '/app/team/join' : '/app/team'}
        >
          <IonIcon icon={people} />
          <IonLabel>Team</IonLabel>
        </IonTabButton>
        {ctx.admin && (
          <IonTabButton tab="admin" href="/app/admin">
            <IonIcon icon={construct} />
            <IonLabel>Admin</IonLabel>
          </IonTabButton>
        )}
      </IonTabBar>
    </IonTabs>
  );
};

export default Dashboard;
