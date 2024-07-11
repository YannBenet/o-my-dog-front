import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './calendar.scss';

/* type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece]; */
/* interface CalendarSelectProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
} */
interface CalendarSelectProps {
  onChange: (dateRange: [Date, Date]) => void;
}
// formatage de la date
const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

function CalendarSelect({ onChange }: CalendarSelectProps) {
  /* const [value, setValue] = useState<Value>(new Date());

  useEffect(() => {
    setValue([
      new Date('2024-07-11T22:00:00.000Z'),
      new Date('2024-07-19T21:59:59.999Z'),
    ]);
  }, []); */
  const [value, setValue] = useState<[Date, Date]>([
    new Date('2024-07-11T22:00:00.000Z'),
    new Date('2024-07-19T21:59:59.999Z'),
  ]);

  useEffect(() => {
    onChange(value); // Notify parent component of initial value
  }, []);

  const handleDateChange = (date: Date | Date[]) => {
    if (Array.isArray(date)) {
      setValue(date as [Date, Date]);
      onChange(date as [Date, Date]);
    }
  };

  const DayJ = new Date();
  return (
    <section className="availability-calendar">
      <Calendar
        selectRange
        onChange={handleDateChange}
        value={value}
        minDate={DayJ}
      />
      <div className="availability-form-top-date">
        <p>
          Date de début:
          <span>
            {Array.isArray(value) && value[0]
              ? formatDate(value[0]?.toDateString())
              : 'N/A'}
          </span>
        </p>
        <p>
          Date de fin:
          <span>
            {Array.isArray(value) && value[1]
              ? formatDate(value[1].toDateString())
              : 'N/A'}
          </span>
        </p>
      </div>
    </section>
  );
}
export default CalendarSelect;
