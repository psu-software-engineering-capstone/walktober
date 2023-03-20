/* eslint-disable react/prop-types */
import { IonToolbar, IonHeader } from '@ionic/react';

/* Components */
import NavLink from './NavLink';

/* Pages */
import { isPlatform } from '@ionic/core';
import { useContext } from 'react';
import AuthContext from '../store/auth-context';

interface NavBarProps {
  collapse?: 'condense' | 'fade'; // carryover from ion-header
  children?: React.ReactNode; // child elements like titles
}

const NavBar: React.FC<NavBarProps> = ({
  collapse = undefined,
  children = null
}) => {
  // checks if the user is an admin or not
  const ctx = useContext(AuthContext);
  const isAdmin = ctx.admin;

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
            <NavLink id="nav-home" text="Home" href="/app/home" />
            <NavLink id="nav-team" text="Team" href={ctx.team === '' ? '/app/team/join' : '/app/team'} />
            <NavLink id="nav-profile" text="Profile" href="/app/profile">
              <NavLink id="nav-steps-log" text="Steps Log" href="/app/manualsteps" />
            </NavLink>
            {isAdmin && (
              <NavLink id="nav-admin" text="Admin" href="/app/admin">
                <NavLink
                  id="nav-admin-announcements"
                  text="Announcements"
                  href="/app/admin/announcements"
                />
              </NavLink>
            )}
            <NavLink id="nav-about" text="About" href="https://www.pdx.edu/recreation/walktober" />
          </div>
        </IonToolbar>
      </IonHeader>
    );
  }
};

export default NavBar;
