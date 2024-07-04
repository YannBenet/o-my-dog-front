import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../PageStyle/Availability.scss';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function Availability() {
  const [value, setValue] = useState<Value>(new Date());

  useEffect(()=> {
    setValue([
      new Date("2024-07-11T22:00:00.000Z"),
      new Date("2024-07-19T21:59:59.999Z")
    ])
  },[])

  console.log(value);

  return (
    <div>
      <Calendar selectRange onChange={setValue} value={value} />
      <p>Date value 1: {Array.isArray(value) ? value[0].toDateString() : value.toDateString()}</p>
      <p>Date value 2: {Array.isArray(value) && value[1] ? value[1].toDateString() : 'N/A'}</p>
    
    </div>
  );
}

export default Availability;
