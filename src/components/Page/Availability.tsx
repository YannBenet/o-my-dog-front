/* eslint-disable consistent-return */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../PageStyle/Availability.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListAnimalsSchema } from '../../schema/petSitter.schema';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const API_URL = 'http://localhost:5000/api';

// Requète pour poster une annonce
const store = async (formData: {
  date_start: string;
  date_end: string;
  mobility: boolean;
  home: boolean;
  description: string;
  animal: string[];
}) => {
  const id = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API_URL}/announcements/users/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Annonce échoué!');
    }
    return await response.json();
  } catch (error) {
    console.error("Erruer du POST de l'annonce:", error);
  }
};
// Récupération de la liste des animaux
const getListAnimals = async () => {
  const response = await fetch(`${API_URL}/animals`);
  const dataAnimals = await response.json();
  const transformedData = { Animals: dataAnimals };
  try {
    return ListAnimalsSchema.parse(transformedData);
  } catch (error) {
    console.error('Tous les animaux ont été dévorés!', error);
    throw error;
  }
};
// formatage de la date
const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

function Availability() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    date_start: '',
    date_end: '',
    mobility: false,
    home: false,
    description: '',
    animal: [] as string[],
  });
  const {
    data: dataAnimals,
    isLoading: isLoadingAnimals,
    isError: isErrorAnimals,
  } = useQuery({
    queryKey: ['Animals'],
    queryFn: getListAnimals,
  });
  const [value, setValue] = useState<Value>(new Date());

  useEffect(() => {
    setValue([
      new Date('2024-07-11T22:00:00.000Z'),
      new Date('2024-07-19T21:59:59.999Z'),
    ]);
  }, [location]);

  const navigate = useNavigate();

  if (isLoadingAnimals) {
    return <p>Nous essayons dapos; tous les animaux!</p>;
  }
  if (isErrorAnimals) {
    return <p>Tous nos animaux sont en balades!</p>;
  }
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value: inputValue, type } = e.target;
    const { checked } = target as HTMLInputElement;

    if (type === 'checkbox') {
      if (name === 'mobility' || name === 'home') {
        setFormData({
          ...formData,
          [name]: checked,
        });
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          animal: checked
            ? [...prevFormData.animal, name]
            : prevFormData.animal.filter((animal) => animal !== name),
        }));
      }
    } else {
      setFormData({
        ...formData,
        [name]: inputValue,
      });
    }
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (Array.isArray(value) && value[0] && value[1]) {
      try {
        const id = localStorage.getItem('userId');
        if (id) {
          const updatedFormData = {
            ...formData,
            date_start: value[0].toISOString(),
            date_end: value[1].toISOString(),
          };
          const response = await store(updatedFormData);
          console.log('Annonce postée', response);
          setFormData({
            date_start: '',
            date_end: '',
            mobility: false,
            home: false,
            description: '',
            animal: [],
          });
          navigate(`/Profile/${id}`);
        } else {
          console.error('Aucun ID trouvé dans localStorage');
        }
      } catch (error) {
        console.error('Annonce invalide', error);
      }
    } else {
      console.error('Veuillez sélectionner une plage de dates');
    }
  };
  const listAnimals = dataAnimals?.Animals.map((animal: { label: string }) => (
    <div
      key={animal.label}
      className="availability-form-bottom-animals-select-checkbox"
    >
      <input
        type="checkbox"
        name={animal.label}
        id={animal.label}
        checked={formData.animal.includes(animal.label)}
        onChange={handleChange}
      />
      <label htmlFor={animal.label}>
        {animal.label.charAt(0).toUpperCase() + animal.label.slice(1)}
      </label>
    </div>
  ));
  return (
    <section className="availability">
      <section className="availability-calendar">
        <Calendar
          selectRange
          onChange={setValue}
          value={value}
          minDate={new Date()}
        />
      </section>
      <section className="availability-form">
        <form onSubmit={handleSubmit} className="availability-form-submit">
          <div className="availability-form-top">
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
              </p>{' '}
            </div>
            <div className="availability-form-top-description">
              <textarea
                name="description"
                id="description"
                placeholder="La description des condition d'accueil de l'animal"
                rows={6}
                onChange={handleChange}
                value={formData.description}
              />
            </div>
          </div>
          <div className="availability-form-bottom">
            <div className="availability-form-bottom-mobility">
              <div>
                <input
                  type="checkbox"
                  name="mobility"
                  id="mobility"
                  checked={formData.mobility}
                  onChange={handleChange}
                />
                <label htmlFor="mobility">Peut se déplacer</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="home"
                  id="home"
                  checked={formData.home}
                  onChange={handleChange}
                />
                <label htmlFor="home">Garde à mon domicile</label>
              </div>
            </div>
            <div className="availability-form-bottom-animals">
              <p>Sélectionné le type d'annimals acceptés : </p>
              <div className="availability-form-bottom-animals-select">
                {listAnimals}
              </div>

              <div className="availability-form-bottom-button">
                <button type="submit">Validez vos disponibilitées</button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
}

export default Availability;
