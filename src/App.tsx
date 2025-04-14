/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import SignupForm from './pages/signup/signupForm';
import ForgotPassword from './pages/forgotPassword/forgotPassword';
import Dashboard from './Dashboard';
import landing404 from './pages/404landing/landing404';
import AuthContext from './store/auth-context';

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

setupIonicReact();

function App() {
  const ctx = useContext(AuthContext);

  useEffect(() => {
    if (ctx.user === null) {
      console.log('auth state: logged out');
    } else {
      console.log('auth state: logged in');
    }
  }, [ctx.user]);

  useEffect(() => {
    if (ctx.user && ctx.team === '') {
      console.log('team state: no team');
    }
    if (ctx.user && ctx.team !== '') {
      console.log(`team state: ${ctx.team}`);
    }
  }, [ctx.team]);

  useEffect(() => {
    if (ctx.user && ctx.admin === false) {
      console.log('admin state: not admin');
    }
    if (ctx.user && ctx.admin === true) {
      console.log('admin state: admin');
    }
  }, [ctx.admin]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route component={landing404} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/register" component={SignupForm} />
          <Route exact path="/password/reset" component={ForgotPassword} />
          {/* Cannot have exact here */}
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
