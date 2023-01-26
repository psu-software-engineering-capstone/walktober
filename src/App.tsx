/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/login/login';
import Signup from './pages/signup/Signup';
import ForgotPassword from './pages/forgotpassword/forgotpassword';
import Dashboard from './Dashboard';
import Profile from './pages/profile/Profile';

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
import { auth } from './firebase';

setupIonicReact();

function App() {
  const { user, loading } = useAuthContext();

  useEffect(() => {
    void auth.signOut();
  }, []);

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
          <Route exact path="/password/reset" component={ForgotPassword} />
          <Route exact path="/profile" component={Profile} />
          {/* cannot have exact here */}
          <Route path="/app" component={Dashboard} />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
