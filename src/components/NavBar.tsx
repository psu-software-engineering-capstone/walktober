/* eslint-disable react/prop-types */
import { IonToolbar, IonHeader } from '@ionic/react';

/* Components */
import NavLink from './NavLink';

/* Pages */
import { isPlatform } from '@ionic/core';

interface NavBarProps {
  collapse?: 'condense' | 'fade'; // carryover from ion-header
  children?: React.ReactNode; // child elements like titles
}

const NavBar: React.FC<NavBarProps> = ({
  collapse = undefined,
  children = null
}) => {
  if (isPlatform('android') || isPlatform('ios')) {
    return (
      <IonHeader collapse={collapse}>
        <IonToolbar>
          <img
            id="psu-logo"
            src="assets/logo.svg"
            slot="start"
            alt="PSU logo"
            draggable="false"
          />
          {children}
        </IonToolbar>
      </IonHeader>
    );
  } else {
    return (
      <IonHeader collapse={collapse}>
        <IonToolbar>
          <img
            id="psu-logo"
            src="assets/logo.svg"
            slot="start"
            alt="PSU logo"
            draggable="false"
          />
          {children}
          <div slot="end">
            <NavLink id="home" text="Home" routerLink="/app/home" />
            <NavLink id="team" text="Team" routerLink="/app/team" />
            <NavLink id="profile" text="Profile" routerLink="/app/profile" />
            <NavLink id="logs" text="Logs" routerLink="/app/manualsteps" />
            <NavLink id="admin" text="Admin" routerLink="/app/admin" />
            <NavLink id="admin-announcements" text="Announcements" routerLink="/app/admin/announcements" />
          </div>
        </IonToolbar>
      </IonHeader>
    );
  }
};

export default NavBar;
