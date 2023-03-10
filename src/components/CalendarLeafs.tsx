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
  let day = 1;

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol>{'October'}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="dow">S</IonCol>
          <IonCol className="dow">M</IonCol>
          <IonCol className="dow">Tu</IonCol>
          <IonCol className="dow">W</IonCol>
          <IonCol className="dow">Th</IonCol>
          <IonCol className="dow">F</IonCol>
          <IonCol className="dow">Sa</IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {monthStart.getDay() == 0 ? day++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {monthStart.getDay() == 1 || day > 1 ? day++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {monthStart.getDay() == 2 || day > 1 ? day++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {monthStart.getDay() == 3 || day > 1 ? day++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {monthStart.getDay() == 4 || day > 1 ? day++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {monthStart.getDay() == 5 || day > 1 ? day++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {monthStart.getDay() == 6 || day > 1 ? day++ : ''}
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day++}
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day <= 31 ? day++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day <= 31 ? day++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day <= 31 ? day++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day <= 31 ? day++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day <= 31 ? day++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day <= 31 ? day++ : ''}
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              {day < 31 ? (
                data[day].color !== 'null' ? (
                  <img
                    alt={data[day].color}
                    src={
                      data[day].color === 'green'
                        ? GreenLeaf
                        : data[day].color === 'yellow'
                        ? YellowLeaf
                        : data[day].color === 'orange'
                        ? OrangeLeaf
                        : ''
                    }
                    className="leafImg"
                  ></img>
                ) : (
                  ''
                )
              ) : (
                ' '
              )}
              {day <= 31 ? day++ : ''}
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
    <>
      {data.length > 30 ? (
        populateCalendar(data)
      ) : (
        <h1>Unable to load calendar data</h1>
      )}
    </>
  );
};

export default CalendarLeafs;

// <img alt="Orange leaf" src={OrangeLeaf}></img>
// <img alt="Yellow leaf" src={YellowLeaf}></img>
// <img alt="Green leaf" src={GreenLeaf}></img>
