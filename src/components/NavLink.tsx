import {
  IonIcon,
  IonItem,
  useIonPopover,
  IonContent
} from '@ionic/react';
import { chevronDown } from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router';
import './NavLink.scss';

interface NavLinkProps {
  id: string // id for dropdown trigger
  text: string // text to display for link
  href: string // link location
  children?: React.ReactNode // links present in dropdown
}

const NavLink: React.FC<NavLinkProps> = ({ id, text, href, children = null }) => {
  const history = useHistory();

  const [present, dismiss] = useIonPopover(() =>
    <IonContent onMouseLeave={dismiss}>
      {children}
    </IonContent>
  );

  const dismissPopover = (e: React.MouseEvent) => {
    // get the element under the mouse pointer
    const elem = document.elementFromPoint(e.clientX, e.clientY);

    // if the mouse is not hovering in the popover, dismiss the popover
    if(elem?.closest('ion-popover') === null) {
      dismiss();
    }
  };

  const navigate = (e: React.MouseEvent) => {
    const popover = e.currentTarget.closest('ion-popover') as HTMLIonPopoverElement;

    // links inside popovers have no access to useHistory(), so they will
    // pass their current 'href' to the dismiss() event
    if(popover !== null) {
      popover.dismiss(href);
    }
    // links outside popovers can navigate directly
    else {
      history.push(href);
    }
  };

  if (children) {
    return (
      <div className="nav-link-container">
        <IonItem id={id} routerLink={href} onMouseEnter={(e: any) => {
          present({
            event: e,
            animated: false,
            arrow: false,
            showBackdrop: false,
            size: 'auto',
            cssClass: 'dropdown-popover',
            onDidDismiss: (e: CustomEvent) => {
              if(e.detail.data !== undefined) {
                history.push(e.detail.data);
              }
            }
          });
        }} onMouseLeave={dismissPopover}>
          <span>{text}</span>
          <IonIcon icon={chevronDown} />
        </IonItem>
      </div>
    );
  } else {
    return (
        <div className="nav-link-container">
          <IonItem id={id} onClick={navigate}>
            <span>{text}</span>
          </IonItem>
        </div>
    );
  }
};

export default NavLink;
