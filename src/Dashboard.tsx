import { Redirect, Route } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { ellipse, square, triangle } from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import HealthApp from "./pages/healthapp/HealthApp";

const Dashboard: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/app/tab1" component={Tab1} />
        <Route exact path="/app/tab2" component={Tab2} />
        <Route exact path="/app/tab3" component={Tab3} />
        <Route exact path="/app/healthapp" component={HealthApp} />
        <Route exact path="/app">
          <Redirect to="/app/tab1" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
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
      </IonTabBar>
    </IonTabs>
  );
};

export default Dashboard;
