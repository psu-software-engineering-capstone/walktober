import { IonCol, IonGrid, IonItem, IonLabel, IonRow } from '@ionic/react';
import React from 'react';
import OrangeLeaf from '../assets/OrangeLeaf.png';
import YellowLeaf from '../assets/yellowLeaf.png';
import GreenLeaf from '../assets/GreenLeaf.png';
import './CalendarLeafs.css';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const monthStart = new Date(`October 1, ${currentYear}`);

// for displaying badges we could just make an array of the badge level with its current leaf. That way the content could
// just be leaftDate[number]; to display it more or less. Probably more complicated than that but that's the jist

const populateCalendar = () => {
  let number = 1;
  const dummyLeafs = Array(31);
  const dummyLeafsAlt = Array(31);
  dummyLeafs[8] = OrangeLeaf;
  dummyLeafs[9] = OrangeLeaf;
  dummyLeafs[10] = GreenLeaf;
  dummyLeafs[11] = YellowLeaf;
  dummyLeafs[12] = OrangeLeaf;
  dummyLeafs[13] = OrangeLeaf;
  dummyLeafs[14] = GreenLeaf;
  dummyLeafs[16] = YellowLeaf;
  dummyLeafs[17] = null;
  dummyLeafsAlt[8] = 'orange leaf';
  dummyLeafsAlt[9] = 'orange leaf2';
  dummyLeafsAlt[10] = 'orange leaf3';

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol size="2">
            <IonLabel>{'October'}</IonLabel>
          </IonCol>
          <IonCol className="leaf-legend" size="auto">
            <img alt="Orange leaf" src={OrangeLeaf} className="leafImg" />
            5,000-7,499 steps
            <img alt="Yellow leaf" src={YellowLeaf} className="leafImg" />
            7,500-9,999 steps
            <img alt="Green leaf" src={GreenLeaf} className="leafImg" />
            10,000 steps
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {monthStart.getDay() == 0 ? number++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {monthStart.getDay() == 1 || number > 1 ? number++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {monthStart.getDay() == 2 || number > 1 ? number++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {monthStart.getDay() == 3 || number > 1 ? number++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {monthStart.getDay() == 4 || number > 1 ? number++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {monthStart.getDay() == 5 || number > 1 ? number++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {monthStart.getDay() == 6 || number > 1 ? number++ : ''}
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number++}
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number <= 31 ? number++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number <= 31 ? number++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number <= 31 ? number++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number <= 31 ? number++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number <= 31 ? number++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number <= 31 ? number++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {dummyLeafs[number] !== null ? (
                <img
                  alt={dummyLeafsAlt[number]}
                  src={dummyLeafs[number]}
                  className="leafImg"
                ></img>
              ) : (
                ''
              )}
              {number <= 31 ? number++ : ''}
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

const CalendarLeafs: React.FC<object> = () => {
  // let calStart = false;

  return <>{populateCalendar()}</>;
};

export default CalendarLeafs;

// <img alt="Orange leaf" src={OrangeLeaf}></img>
// <img alt="Yellow leaf" src={YellowLeaf}></img>
// <img alt="Green leaf" src={GreenLeaf}></img>
