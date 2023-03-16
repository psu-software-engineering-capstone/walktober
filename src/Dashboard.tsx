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
import landing404 from './pages/404landing/landing404';
import HomePage from './pages/homePage/homePage';
import Profile from './pages/profile/profile';
import newPassword from './pages/profile/newPassword';
import ManualSteps from './pages/manualLoggingSteps/manualLoggingSteps';
import HealthApp from './pages/healthApp/healthApp';
import TeamHome from './pages/teamHome/teamHome';
import TeamJoin from './pages/teamHome/teamJoin';
import TeamCreation from './pages/teamCreation/teamCreation';
import Admin from './pages/admin/admin';
import Announcements from './pages/admin/announcements';
import StepsCalculator from './pages/stepsCalculator/stepsCalculator';
import AuthContext from './store/auth-context';
import Results from './pages/results/results';
import AdminSteps from './pages/adminSteps/adminSteps';

/* Routes */
import ToLogin from './routes/ToLogin';
import ToTeamHome from './routes/ToTeamHome';
import ToTeamJoin from './routes/ToTeamJoin';
import ToHome from './routes/ToHome';

/* Theming */
import './theme/app.scss';

/* Context */
import { useContext } from 'react';

const Dashboard: React.FC = () => {
  const ctx = useContext(AuthContext);

  const tabsVisible = isPlatform('android') || isPlatform('ios');

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route component={landing404} />
        <Route exact path="/app/home" component={ctx.user ? HomePage : ToLogin} />
        <Route exact path="/app/profile" component={ctx.user ? Profile : ToLogin} />
        <Route exact path="/app/profile/passwordChange" component={ctx.user ? newPassword : ToLogin} />
        <Route exact path="/app/manualsteps" component={ctx.user ? ManualSteps : ToLogin} />
        <Route exact path="/app/stepscalc" component={ctx.user ? StepsCalculator : ToLogin} />
        <Route exact path="/app/healthapp" component={ctx.user ? HealthApp : ToLogin} />
        <Route exact path="/app/teamcreation" component={ctx.user && ctx.team === '' ? TeamCreation : ctx.user && ctx.team !== '' ? ToTeamHome : ToLogin} />
        <Route exact path="/app/team" component={ctx.user && ctx.team !== '' ? TeamHome : ctx.user && ctx.team === '' ? ToTeamJoin : ToLogin} />
        <Route exact path="/app/team/join" component={ctx.user && ctx.team === '' ? TeamJoin : ctx.user && ctx.team !== '' ? ToTeamHome : ToLogin} />
        <Route exact path="/app/admin" component={ctx.user && ctx.admin === true ? Admin : ctx.user && ctx.admin === false ? ToHome : ToLogin} />
        <Route exact path="/app/admin/announcements" component={Announcements}/>
        <Route exact path="/app/results" component={ctx.user ? Results : ToLogin} />
        <Route path="/app/adminSteps/:email" component={ctx.user && ctx.admin === true ? AdminSteps : ctx.user && ctx.admin === false ? ToHome : ToLogin} />
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
