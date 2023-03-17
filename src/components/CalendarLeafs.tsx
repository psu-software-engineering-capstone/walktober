import { IonGrid } from '@ionic/react';
import React from 'react';
import OrangeLeaf from '../assets/OrangeLeaf.png';
import YellowLeaf from '../assets/yellowLeaf.png';
import GreenLeaf from '../assets/GreenLeaf.png';
import './CalendarLeafs.css';

const now = Date.now();
const currentDate = new Date(now);
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
      <IonGrid className="grid-container">
        <h2 className="month grid-item-title">{'October'}</h2>
        <h3 className="grid-item-dow">Su</h3>
        <h3 className="grid-item-dow">M</h3>
        <h3 className="grid-item-dow">Tu</h3>
        <h3 className="grid-item-dow">W</h3>
        <h3 className="grid-item-dow">Th</h3>
        <h3 className="grid-item-dow">F</h3>
        <h3 className="grid-item-dow">Sa</h3>

        <div className="grid-item">
        {monthStart.getDay() == 0 ? day++ : ''}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {monthStart.getDay() == 1 || day > 1 ? day++ : ''}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {monthStart.getDay() == 2 || day > 1 ? day++ : ''}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {monthStart.getDay() == 3 || day > 1 ? day++ : ''}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {monthStart.getDay() == 4 || day > 1 ? day++ : ''}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {monthStart.getDay() == 5 || day > 1 ? day++ : ''}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {monthStart.getDay() == 6 || day > 1 ? day++ : ''}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day++}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day <= 31 ? day++ : ''}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day <= 31 ? day++ : ''}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day <= 31 ? day++ : ''}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day <= 31 ? day++ : ''}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day <= 31 ? day++ : ''}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day <= 31 ? day++ : ''}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>

        <div className="grid-item">
        {day <= 31 ? day++ : ''}
          {day < 31 ? (
            data[day-2].color !== 'null' ? (
              <img
                alt={data[day-2].color + ' leaf'}
                src={
                  data[day-2].color === 'green'
                    ? GreenLeaf
                    : data[day-2].color === 'yellow'
                    ? YellowLeaf
                    : data[day-2].color === 'orange'
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
        </div>
        
        <div className="grid-item-label">
          <img alt="Orange leaf" src={OrangeLeaf} className="leafImg mx" />
          5,000-7,499 steps
          <img alt="Yellow leaf" src={YellowLeaf} className="leafImg mx" />
          7,500-9,999 steps
          <img alt="Green leaf" src={GreenLeaf} className="leafImg mx" />
          10,000+ steps
        </div>
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
