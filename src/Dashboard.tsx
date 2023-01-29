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
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import HealthApp from './pages/healthapp/HealthApp';
import HomePage from './pages/HomePage/HomePage';
import TeamCreation from './pages/TeamCreation';
import ManualSteps from './pages/manualLoggingSteps/manualLoggingSteps';

/* Theming */
import './theme/app.scss';

const Dashboard: React.FC = () => {
  const tabsVisible = isPlatform('android') || isPlatform('ios');
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/app/tab1" component={Tab1} />
        <Route exact path="/app/tab2" component={Tab2} />
        <Route exact path="/app/tab3" component={Tab3} />
        <Route exact path="/app/healthapp" component={HealthApp} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/app/teamcreation" component={TeamCreation} />
        <Route exact path="/app/manualsteps" component={ManualSteps} />
        <Route exact path="/app">
          <Redirect to="/app/tab1" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom" className={tabsVisible ? '' : 'hidden'}>
        <IonTabButton tab="tab1" href="/app/tab1">
          <IonIcon icon={triangle} />
          <IonLabel>Tab 1</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/app/tab2">
          <IonIcon icon={ellipse} />
          <IonLabel>Tab 2</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/app/tab3">
          <IonIcon icon={square} />
          <IonLabel>Tab 3</IonLabel>
        </IonTabButton>
        <IonTabButton tab="healthapp" href="/app/healthapp">
          <IonIcon icon={square} />
          <IonLabel>Health App Integration</IonLabel>
        </IonTabButton>
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={triangle} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="teamcreation" href="/app/teamcreation">
          <IonIcon icon={square} />
          <IonLabel>Team Creation</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Dashboard;
