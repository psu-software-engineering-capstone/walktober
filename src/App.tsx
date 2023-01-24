/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, isPlatform, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/login/login';
import Signup from './pages/signup/Signup';
import ForgotPassword from './pages/forgotpassword/forgotpassword';
import Dashboard from './Dashboard';

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
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { useAuthContext } from './store/auth-context';
import { auth } from './firebase';

setupIonicReact();

function App () {
  const { user, loading } = useAuthContext();

  useEffect(() => {
    if (isPlatform('capacitor')) {
      void GoogleAuth.signOut();
      void auth.signOut();
    } else {
      void auth.signOut();
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      alert(JSON.stringify(user));
    } else {
      alert('Logged Out!');
    }
  }, [user]);

  useEffect(() => {
    if (loading === true) {
      // splash screen //
    }
  }, [loading]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/password/reset" component={ForgotPassword} />
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

