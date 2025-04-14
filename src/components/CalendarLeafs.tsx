// File created by NathanMoes, with changes by bailee-crandley
// File contains a react element that is aimed at creating a calendar to display leaf icons corresponding to number of steps each day for october
import { IonGrid } from '@ionic/react';
import React from 'react';
import OrangeLeaf from '../assets/OrangeLeaf.png'; // import for orange leaf
import YellowLeaf from '../assets/yellowLeaf.png'; // import for yellow leaf
import GreenLeaf from '../assets/GreenLeaf.png'; // import for green leaf
import './CalendarLeafs.css';

const now = Date.now();
const currentDate = new Date(now);
const currentYear = currentDate.getFullYear();
const monthStart = new Date(`October 1, ${currentYear}`);

// below is declaration of the steps log type for type script purposes
interface StepLog {
  date: string; // date as string such as october, 1, 2023 etc
  steps: number; // number of steps as string
  color: string; // color of the leaf as string, used for conditional rendering of the leaves
}

// below is the major function for this file. It populates the calendar and adds elements. 
// Starting with day1 of the month.

// this is done by using an index variable "day" then incrementing it after each access AFTER 
// it is determined that the day of the week has been hit.

// aka the number increments once the day of the week corresponds to the first day of the month. 
// if it starts on wednesday it will not increment till it has passed over sun, mon, tues = 3 times.

// returned is a css grid populated with an image for the icons/leaves plus the day.
// postfix is used to ensure that the number is correct for each day and increment it after in one line

function getLeafColor(day: number, data: StepLog[]): string {
    
      data[day - 2].color !== 'null' ? (
        <img
          alt={data[day - 2].color + ' leaf'}
          src={
            data[day - 2].color === 'green'
              ? GreenLeaf
              : data[day - 2].color === 'yellow'
              ? YellowLeaf
              : data[day - 2].color === 'orange'
              ? OrangeLeaf
              : ''
          }
          className="leafImg"
        ></img>
      ) : (
        ''
      )
      return data[day - 2].color;
}
const populateCalendar = (data: StepLog[]) => {
  let day = 1; // day var for displaying the day on calendar as well as serving as an index.

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

        {/* {as you will see below inside each div is the image and the number with a ternary operator}
        The index is day-2 as it starts at 1 and is incremented with postfix after each day. Thus the 
        first access with data[day] would be index = 2 and not 0. Thus, -2. There is a cap on 
        day < 31 to ensure that data is not read beyond and to ensure that only 31 days 
        (number) are displayed. As october always has 31 days*/}

        <div className="grid-item">
          {monthStart.getDay() == 0 ? day++ : ''}
          {day < 31 ? (
            getLeafColor(day, data)
            ) : (
              ' '
            )}
        </div>

        <div className="grid-item">
          {monthStart.getDay() == 1 || day > 1 ? day++ : ''}
          {day < 31 ? (

            getLeafColor(day, data)
            ) : (
              ' '
            )}
        </div>

        <div className="grid-item">
          {monthStart.getDay() == 2 || day > 1 ? day++ : ''}
          {day < 31 ? (
            getLeafColor(day, data)
            ) : (
              ' '
            )}
        </div>

        <div className="grid-item">
          {monthStart.getDay() == 3 || day > 1 ? day++ : ''}
          {day < 31 ? (
            getLeafColor(day, data)
            ) : (
              ' '
            )}
        </div>

        <div className="grid-item">
          {monthStart.getDay() == 4 || day > 1 ? day++ : ''}
          {day < 31 ? (
            getLeafColor(day, data)
            ) : (
              ' '
            )}
        </div>

        <div className="grid-item">
          {monthStart.getDay() == 5 || day > 1 ? day++ : ''}
          {day < 31 ? (
            getLeafColor(day, data)
            ) : (
              ' '
            )}
        </div>

        <div className="grid-item">
          {monthStart.getDay() == 6 || day > 1 ? day++ : ''}
          {day < 31 ? (
            getLeafColor(day, data)
            ) : (
              ' '
            )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
            ) : (
              ' '
            )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
            ) : (
              ' '
            )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
            ) : (
              ' '
            )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
            ) : (
              ' '
            )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
            ) : (
              ' '
            )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
            ) : (
              ' '
            )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
            ) : (
              ' '
            )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
            ) : (
              ' '
            )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
            ) : (
              ' '
            )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
            ) : (
              ' '
            )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
            ) : (
              ' '
            )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
            ) : (
              ' '
            )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
          ) : (
            ' '
          )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
          ) : (
            ' '
          )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
          ) : (
            ' '
          )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
          ) : (
            ' '
          )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
          ) : (
            ' '
          )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
          ) : (
            ' '
          )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
          ) : (
            ' '
          )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
          ) : (
            ' '
          )}
        </div>

        <div className="grid-item">
          {day++}
          {day < 31 ? (
            getLeafColor(day, data)
          ) : (
            ' '
          )}
        </div>

        <div className="grid-item">
          {day <= 31 ? day++ : ''}
          {day < 31 ? (
            getLeafColor(day, data)
          ) : (
            ' '
          )}
        </div>

        <div className="grid-item">
          {day <= 31 ? day++ : ''}
          {day < 31 ? (
            getLeafColor(day, data)
          ) : (
            ' '
          )}
        </div>

        <div className="grid-item">
          {day <= 31 ? day++ : ''}
          {day < 31 ? (
            getLeafColor(day, data)
          ) : (
            ' '
          )}
        </div>

        <div className="grid-item">
          {day <= 31 ? day++ : ''}
          {day < 31 ? (
            getLeafColor(day, data)
          ) : (
            ' '
          )}
        </div>

        <div className="grid-item">
          {day <= 31 ? day++ : ''}
          {day < 31 ? (
            getLeafColor(day, data)
          ) : (
            ' '
          )}
        </div>

        <div className="grid-item">
          {day <= 31 ? day++ : ''}
          {day < 31 ? (
            getLeafColor(day, data)
          ) : (
            ' '
          )}
        </div>

        <div className="grid-item">
          {day <= 31 ? day++ : ''}
          {day < 31 ? (
            getLeafColor(day, data)
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

// below is the react feature component for the calendar. It takes props for the data that is used in determining the leaves to display for each day
const CalendarLeafs: React.FC<{ data: StepLog[] }> = ({ data }) => {
  // LEAVE THE h1 IN, otherwise init load will not be happy. As the data would not be populated thus, access violation on array
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
