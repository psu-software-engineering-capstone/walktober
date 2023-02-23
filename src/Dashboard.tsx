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
import { ellipse, square, triangle } from 'ionicons/icons';

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

/* Firebase */
import { auth, FirestoreDB } from './firebase';
import { getDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const Dashboard: React.FC = () => {
  const [addr, setAddr] = useState('');

  const tabsVisible = isPlatform('android') || isPlatform('ios');

  async function checkUser() {
    const dbRef = doc(FirestoreDB, 'users', auth.currentUser.email as string);
    const dbSnap = await getDoc(dbRef);
    const userData = dbSnap.data();
    if (userData.team === '') {
      setAddr('/app/team/join');
    } else {
      setAddr('/app/team');
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/app/home" component={HomePage} />
        <Route exact path="/app/profile" component={Profile} />
        <Route
          exact
          path="/app/profile/passwordChange"
          component={newPassword}
        />
        <Route exact path="/app/manualsteps" component={ManualSteps} />
        <Route exact path="/app/stepscalc" component={StepsCalculator} />
        <Route exact path="/app/healthapp" component={HealthApp} />
        <Route exact path="/app/teamcreation" component={TeamCreation} />
        <Route exact path="/app/team" component={TeamHome} />
        <Route exact path="/app/team/join" component={TeamJoin} />
        <Route exact path="/app/admin" component={Admin} />
        <Route exact path="/app">
          <Redirect to="/app/home" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom" className={tabsVisible ? '' : 'hidden'}>
        <IonTabButton tab="home" href="/app/home">
          <IonIcon icon={triangle} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/app/profile">
          <IonIcon icon={ellipse} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
        <IonTabButton tab="manualsteps" href="/app/manualsteps">
          <IonIcon icon={square} />
          <IonLabel>Manual Steps</IonLabel>
        </IonTabButton>
        <IonTabButton tab="healthapp" href="/app/healthapp">
          <IonIcon icon={triangle} />
          <IonLabel>Health App</IonLabel>
        </IonTabButton>
        <IonTabButton tab="team" href={addr}>
          <IonIcon icon={square} />
          <IonLabel>Team</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Dashboard;
