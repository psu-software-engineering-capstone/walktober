import {
    IonIcon, IonPopover
} from "@ionic/react";
import { chevronDown } from "ionicons/icons";
import React, { MouseEvent } from "react";
import "./NavLink.scss";

interface NavLinkProps {
    id: string,
    text: string,
    href?: string,
    children?: React.ReactNode
}

const NavLink: React.FC<NavLinkProps> = ({ id, text, href="", children=null }) => {
    const dismissPopover = (e: MouseEvent): void => {
        let elem = document.body.querySelector("#" + id + "-popover");
        (elem as HTMLIonPopoverElement)?.dismiss();
    }

    if(children) {
        return (
            <div className="nav-link-container">
                <span className="nav-link-text" id={id}>
                    {href ? <a href={href}>{text}</a> : <span>{text}</span>}
                    <IonIcon icon={chevronDown} />
                </span>
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
        )
    }
    else {
        return (
            <div className="nav-link-container">
                <span className="nav-link-text" id={id}>
                    {href ? <a href={href}>{text}</a> : <span>{text}</span>}
                </span>
            </div>
        )
    }
};

export default NavLink;
