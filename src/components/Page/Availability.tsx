/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../PageStyle/Availability.scss';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function Availability() {
  const [value, setValue] = useState<Value>(new Date());
  useEffect(() => {
    setValue([
      new Date('2024-07-11T22:00:00.000Z'),
      new Date('2024-07-19T21:59:59.999Z'),
    ]);
  }, []);

  return (
    <section className="availability">
      <section className="availability-calendar">
        <Calendar selectRange onChange={setValue} value={value} />
      </section>
      <section className="availability-form">
        <form action="submit" className="availability-form-submit">
          <div className="availability-form-top">
            <div className="availability-form-top-date">
              <p>
                Date de début:
                <span>
                  {Array.isArray(value)
                    ? value[0]?.toDateString()
                    : value?.toDateString()}
                </span>
              </p>
              <p>
                Date de fin:
                <span>
                  {Array.isArray(value) && value[1]
                    ? value[1].toDateString()
                    : 'N/A'}
                </span>
              </p>{' '}
            </div>
            <div className="availability-form-top-description">
              <textarea
                name="description"
                id="description"
                placeholder="La description des condition d'accueil de l'animal"
                rows={10}
              />
            </div>
          </div>
          <div className="availability-form-right">
            <div className="availability-form-bottom-mobility">
              <div>
                <input type="checkbox" name="mobility" id="mobility" />
                <label htmlFor="mobility">Peut se déplacer</label>
              </div>
              <div>
                <input type="checkbox" name="home" id="home" />
                <label htmlFor="home">Garde à mon domicile</label>
              </div>
            </div>
            <div className="availability-form-bottom-animals">
              <p>Sélectionné le type d'annimals acceptés : </p>
              <div className="availability-form-right-animals-select">
                <div>
                  <input type="checkbox" name="chien" id="chien" />
                  <label htmlFor="chien">Chien</label>
                </div>
                <div>
                  <input type="checkbox" name="chat" id="chat" />
                  <label htmlFor="chat">Chat</label>
                </div>
                <div>
                  <input type="checkbox" name="lapin" id="lapin" />
                  <label htmlFor="lapin">Lapin</label>
                </div>
                <div>
                  <input type="checkbox" name="tortue" id="tortue" />
                  <label htmlFor="tortue">Tortue</label>
                </div>
                <div>
                  <input type="checkbox" name="serpent" id="serpent" />
                  <label htmlFor="serpent">Serpent</label>
                </div>
              </div>
            </div>
            <div className="availability-form-bottom-button">
              <button type="submit">Validez vos disponibilitées</button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
}

export default Availability;
