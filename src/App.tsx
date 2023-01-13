/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/login/login';
import Signup from './pages/signup/Signup';
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
import { auth } from './firebase';
import { FirebaseAuthentication } from '@awesome-cordova-plugins/firebase-authentication';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import AuthContext from './store/auth-context';

setupIonicReact();

function App () {
  // auto signout when the app is launched
  useEffect(() => {
    void auth.signOut();
    void FirebaseAuthentication.signOut();
    void GoogleAuth.signOut();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: false
      }}
    >
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            {/* cannot have exact here */}
            <Route path="/app" component={Dashboard} />
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </AuthContext.Provider>
  );
}

export default App;
