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
import { useContext } from 'react';
import AuthContext from './store/auth-context';
import AdminSteps from './pages/adminSteps/adminSteps';

const Dashboard: React.FC = () => {
  const ctx = useContext(AuthContext);
  const isAdmin = ctx.admin;

  const tabsVisible = isPlatform('android') || isPlatform('ios');

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
        <IonTabButton tab="team" href={ctx.team === '' ? '/app/team/join' : '/app/team'}>
          <IonIcon icon={people} />
          <IonLabel>Team</IonLabel>
        </IonTabButton>
        {isAdmin && (
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
