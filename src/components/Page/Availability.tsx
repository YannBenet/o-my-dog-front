import { useState } from 'react';
import '../PageStyle/Availability.scss';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function Availability() {
  const [value, setValue] = useState<Value>(new Date());
  return (
    <div>
      <Calendar selectRange onChange={setValue} value={value} />
    </div>
  );
}

export default Availability;
