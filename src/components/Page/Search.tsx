/* eslint-disable react/no-unescaped-entities */
/* eslint-disable consistent-return */
import '../PageStyle/Search.scss';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Calendar from 'react-calendar';
import profil from '../../../public/images/profil.jpg';
import {
  ListAnimalsSchema,
  ListDepartmentsSchema,
} from '../../schema/petSitter.schema';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const API_URL = 'http://localhost:5000/api';
// Requete de la recherhce
const search = async (formData: {
  dateStart: string;
  dateEnd: string;
  departmentLabel: string;
  animalLabel: string;
}) => {
  const { dateStart, dateEnd, departmentLabel, animalLabel } = formData;
  const token = localStorage.getItem('token');
  const queryParams = new URLSearchParams({
    date_start: dateStart,
    date_end: dateEnd,
    department_label: departmentLabel,
    animal_label: animalLabel,
  });
  try {
    const response = await fetch(
      `${API_URL}/announcements/?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
// Récupération des départements de la Bdd
const getListDepartments = async () => {
  const response = await fetch(`${API_URL}/departments`);
  const dataDepartment = await response.json();
  const transformedData = { Departments: dataDepartment };
  try {
    return ListDepartmentsSchema.parse(transformedData);
  } catch (error) {
    console.error('Tous les départements ont été réduits en cendre!');
    throw error;
  }
};
function Search() {
  const [valueDate, setValueDate] = useState<Value>(new Date());
  const isLoggedIn = localStorage.getItem('token') !== null;
  const [data, setData] = useState([
    {
      date_start: '',
      date_end: '',
      city: '',
      label: '',
      firstname: '',
      lastname: '',
      home: false,
      mobility: false,
      description: '',
      id: '',
    },
  ]);
  const [formData, setFormData] = useState({
    dateStart: '',
    dateEnd: '',
    departmentLabel: '',
    animalLabel: '',
  });
  const [resultCount, setResultCount] = useState(0);
  useEffect(() => {
    setValueDate([
      new Date('2024-07-11T22:00:00.000Z'),
      new Date('2024-07-19T21:59:59.999Z'),
    ]);
  }, []);
  const {
    data: dataAnimals,
    isLoading: isLoadingAnimals,
    isError: isErrorAnimals,
  } = useQuery({
    queryKey: ['Animals'],
    queryFn: getListAnimals,
  });
  const {
    data: dataDepartment,
    isLoading: isLoadingDepartment,
    isError: isErrorDepartment,
  } = useQuery({
    queryKey: ['Departments'],
    queryFn: getListDepartments,
  });
  if (isLoadingAnimals) {
    return <p>Nous essayons dapos; tous les animaux!</p>;
  }
  if (isErrorAnimals) {
    return <p>Tous nos animaux sont en balades!</p>;
  }
  const listAnimals = dataAnimals?.Animals.map((animal) => (
    <option key={animal.label} value={animal.label}>
      {animal.label}
    </option>
  ));
  if (isLoadingDepartment) {
    return <p>On recherche la list des départements!</p>;
  }
  if (isErrorDepartment) {
    return (
      <p>
        La liste des départements est trop longue pour que je les écrive tous!
      </p>
    );
  }
  const listDepartments = dataDepartment?.Departments.map((department) => (
    <option
      value={department.department_label}
      key={department.department_label}
    >
      {department.department_label}
    </option>
  ));

  /* const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }; */
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Array.isArray(valueDate)) {
      const [startDate, endDate] = valueDate;
      if (startDate && endDate) {
        const updatedFormData = {
          ...formData,
          dateStart: startDate.toISOString(),
          dateEnd: endDate.toISOString(),
        };
        try {
          const response = await search(updatedFormData);
          if (response) {
            setResultCount(response.length);
            setData(response);
          }
          setFormData({
            dateStart: '',
            dateEnd: '',
            departmentLabel: '',
            animalLabel: '',
          });
        } catch (error) {
          console.error('recherche non conforme:', error);
        }
      } else {
        console.error('Veuillez sélectionner une plage de dates complète.');
      }
    }
  };
  // Formatage de la date pour affichage
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const listSearch = data.map((petSitter) => (
    <article className="search-container-result-card" key={petSitter.id}>
      <div className="search-container-result-card-img">
        <img src={profil} alt="profil" />
      </div>
      <div className="search-container-result-card-text">
        <h4>
          {petSitter.firstname} {petSitter.lastname}
        </h4>
        <h6>description</h6>
        <div className="search-container-result-card-description">
          <p>{petSitter.description}</p>
        </div>
        <div className="search-container-result-card-date">
          <h6>Disponibilités</h6>
          <p>
            du <span>{formatDate(petSitter.date_start)}</span> au
            <span>{formatDate(petSitter.date_end)}</span>
          </p>
        </div>
        {/* Si connecté dirige sur la fiche de l'annonce */}
        {isLoggedIn && (
          <NavLink
            to={`/PetSitter/${petSitter.id}`}
            type="button"
            className="search-container-result-card-button"
          >
            Voir Profil
          </NavLink>
        )}
        {/* Si non connecté renvoie sur la page de connexion */}
        {!isLoggedIn && (
          <NavLink
            to="/Connexion"
            type="button"
            className="search-container-result-card-button"
          >
            Voir Profil
          </NavLink>
        )}
      </div>
    </article>
  ));
  return (
    <section className="search">
      <section className="search-form-position">
        <form onSubmit={handleSubmit} className="search-form">
          <section className="search-form-field">
            <section className="search-form-calendar">
              <h3>Sélectionnez la période de garde désiré</h3>
              <Calendar selectRange onChange={setValueDate} value={valueDate} />
            </section>
            <section className="search-form-field-select">
              <section className="search-form-departments">
                <select
                  name="departmentLabel"
                  className="search-form-input"
                  onChange={handleSelectChange}
                >
                  <option value="">
                    -- Selectionnez votre département, si disponible --
                  </option>
                  {listDepartments}
                </select>
              </section>
              <section className="search-form-animals">
                <select
                  name="animalLabel"
                  className="search-form-input"
                  onChange={handleSelectChange}
                >
                  <option value="">
                    -- Selectionnez le type d'animal à faire garder --
                  </option>
                  {listAnimals}
                </select>
              </section>
              <button type="submit" className="search-form-button">
                Validé
              </button>
            </section>
          </section>
        </form>
      </section>
      <section className="search-container">
        <h3>
          {' '}
          Il y a {resultCount} pet-sitter correspondant à votre recherche
        </h3>
        <section className="search-container-result">{listSearch}</section>
      </section>
    </section>
  );
}

export default Search;
