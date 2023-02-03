
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  IonIcon, IonPopover, IonButton
} from '@ionic/react';
import { chevronDown } from 'ionicons/icons';
import React, { MouseEvent } from 'react';
import './NavLink.scss';

interface NavLinkProps {
  id: string // id for dropdown trigger
  text: string // text to display for link
  routerLink?: string // link location (omit for just text)
  children?: React.ReactNode // links present in dropdown
}

const NavLink: React.FC<NavLinkProps> = ({ id, text, routerLink = '', children = null }) => {
  const dismissPopover = (e: MouseEvent): void => {
    const target = e.target as Element;
    const popover = target.parentElement?.parentElement as HTMLIonPopoverElement;
    void popover.dismiss();
  };

  if (children) {
    return (
      <div className="nav-link-container">
        <IonButton id={id} routerLink={routerLink}>
          <span>{text}</span>
          <IonIcon icon={chevronDown} />
        </IonButton>
        <div className="nav-link-dropdown" onMouseLeave={dismissPopover}>
          <IonPopover id={`${id}-popover`} trigger={id}
            triggerAction="hover" side="bottom" alignment="start"
            animated={false} arrow={false} showBackdrop={false}
            dismissOnSelect={true} backdropDismiss={true}
            size="auto">
            {children}
          </IonPopover>
        </div>
      </div>
    );
  } else {
    return (
      <div className="nav-link-container">
        {routerLink
          ? (<IonButton id={id} routerLink={routerLink}>
               <span>{text}</span>
             </IonButton>)
          : (<IonButton id={id}>
               <span>{text}</span>
             </IonButton>)}
      </div>
    );
  }
};

export default NavLink;
