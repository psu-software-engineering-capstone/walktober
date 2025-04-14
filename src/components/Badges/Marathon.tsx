import { IonItem, IonLabel, IonGrid, IonRow, IonCol } from '@ionic/react';
import React from 'react';
import './BadgeStyles.css';
import GenericBadge from './GenericBadge';

const MarathonBadge: React.FC<{}> = () => {
  return (
    <GenericBadge
      image={true}
      innerText="You walked 26.2 miles, thats a whole Marathon!"
      outerText="Marathon!"
      imgSrc="https://cdn-icons-png.flaticon.com/512/3343/3343569.png"
      imgAlt="Ran a Marathon!"
    ></GenericBadge>
  );
};

const Attribute: React.FC<{}> = () => {
  return (
    <a
      href="https://www.flaticon.com/free-icons/marathon"
      title="marathon icons"
    >
      Marathon icons created by Flat Icons - Flaticon
    </a>
  );
};

export default MarathonBadge;
export { Attribute };
