/* eslint-disable react/prop-types */
import {
  IonToolbar,
  IonHeader
} from '@ionic/react';

/* Components */
import NavLink from './NavLink';

/* Pages */
import { isPlatform } from '@ionic/core';

interface NavBarProps {
  collapse?: 'condense' | 'fade' // carryover from ion-header
  children?: React.ReactNode // child elements like titles
}

const NavBar: React.FC<NavBarProps> = ({ collapse = undefined, children = null }) => {
  if (isPlatform('android') || isPlatform('ios')) {
    return (
      <IonHeader collapse={collapse}>
        <IonToolbar>
          <img id="psu-logo" src="assets/logo.svg" slot="start" alt="PSU logo"
            draggable="false" />
          {children}
        </IonToolbar>
      </IonHeader>
    );
  } else {
    return (
      <IonHeader collapse={collapse}>
        <IonToolbar>
          <img id="psu-logo" src="assets/logo.svg" slot="start" alt="PSU logo"
            draggable="false" />
          {children}
          <div slot="end">
            <NavLink id="home" text="Home" href="/app/tab1" />
            <NavLink id="team" text="My Team" href="/app/team" />
            <NavLink id="profile" text="Profile" href="/app/profile">
              <NavLink id="logs" text="Logs" href="/app/tab3" />
            </NavLink>
            <NavLink id="admin" text="Admin" href="/app/admin">
              <NavLink id="admin-announcements"
                  text="Announcements"
                  href="/app/admin/announcements" />
            </NavLink>
          </div>
        </IonToolbar>
      </IonHeader>
    );
  }
};

export default NavBar;
