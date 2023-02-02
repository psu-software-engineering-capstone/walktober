/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
<<<<<<< HEAD
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Admin from './pages/Admin';
=======
import Login from './pages/login/login';
import Signup from './pages/signup/Signup';
import SignupForm from './pages/signup/signupForm';
import ForgotPassword from './pages/forgotpassword/forgotpassword';
import Dashboard from './Dashboard';
>>>>>>> 64f1984450fec5552f332dea7412e67025ff51a3

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { useEffect } from 'react';
import { useAuthContext } from './store/auth-context';
// import { auth } from './firebase';

setupIonicReact();

function App() {
  const { user, loading } = useAuthContext();

  // useEffect(() => {
  //   void auth.signOut();
  // }, []);

  useEffect(() => {
    if (user !== null) {
      console.log('auth state: logged in');
    } else {
      console.log('auth state: logged out');
    }
  }, [user]);

  useEffect(() => {
    if (loading === true) {
      console.log('loading state: true');
    } else {
      console.log('loading state: false');
    }
  }, [loading]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/register" component={SignupForm} />
          <Route exact path="/password/reset" component={ForgotPassword} />
          <Route path="/app" component={Dashboard} />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
        </IonRouterOutlet>
<<<<<<< HEAD
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={triangle} />
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
          <IonTabButton tab="admin" href="/admin">
            <IonIcon icon={square}/>
            <IonLabel>Admin</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);
=======
      </IonReactRouter>
    </IonApp>
  );
}
>>>>>>> 64f1984450fec5552f332dea7412e67025ff51a3

export default App;
