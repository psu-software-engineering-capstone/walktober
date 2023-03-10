import { IonCol, IonGrid, IonItem, IonRow } from '@ionic/react';
import React from 'react';
import OrangeLeaf from '../assets/OrangeLeaf.png';
import YellowLeaf from '../assets/yellowLeaf.png';
import GreenLeaf from '../assets/GreenLeaf.png';
import './CalendarLeafs.css';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const monthStart = new Date(`October 1, ${currentYear}`);

interface StepLog {
  date: string;
  steps: number;
  color: string;
}

// for displaying badges we could just make an array of the badge level with its current leaf. That way the content could
// just be leaftDate[number]; to display it more or less. Probably more complicated than that but that's the jist

const populateCalendar = (data: StepLog[]) => {
  let number = 1;

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol>{'October'}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={OrangeLeaf}
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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
              {data[number].color !== 'null' ? (
                <img
                  alt={data[number].color}
                  src={
                    data[number].color === 'green'
                      ? GreenLeaf
                      : data[number].color === 'yellow'
                      ? YellowLeaf
                      : data[number].color === 'orange'
                      ? OrangeLeaf
                      : ''
                  }
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

const CalendarLeafs: React.FC<{ data: StepLog[] }> = ({ data }) => {
  // let calStart = false;

  return (
    <>{data.length < 30 ? <h1>Not enough data</h1> : populateCalendar(data)}</>
  );
};

export default CalendarLeafs;

// <img alt="Orange leaf" src={OrangeLeaf}></img>
// <img alt="Yellow leaf" src={YellowLeaf}></img>
// <img alt="Green leaf" src={GreenLeaf}></img>
