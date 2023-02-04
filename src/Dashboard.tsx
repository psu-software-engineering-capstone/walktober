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
import HomePage from './pages/HomePage/HomePage';
import Profile from './pages/profile/Profile';
import ManualSteps from './pages/manualLoggingSteps/manualLoggingSteps';
import HealthApp from './pages/healthapp/HealthApp';
import TeamCreation from './pages/TeamCreation';
import TeamHome from './pages/TeamHome/TeamHome';

/* Theming */
import './theme/app.scss';
import StepsCalculator from './pages/stepsCalculator/stepsCalculator';

const Dashboard: React.FC = () => {
  const tabsVisible = isPlatform('android') || isPlatform('ios');
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/app/home" component={HomePage} />
        <Route exact path="/app/profile" component={Profile} />
        <Route exact path="/app/manualsteps" component={ManualSteps} />
        <Route exact path="/app/stepscalc" component={StepsCalculator} />
        <Route exact path="/app/healthapp" component={HealthApp} />
        <Route exact path="/app/teamcreation" component={TeamCreation} />
        <Route exact path="/app/team" component={TeamHome} />
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
        <IonTabButton tab="team" href="/app/team">
          <IonIcon icon={square} />
          <IonLabel>Team</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Dashboard;
