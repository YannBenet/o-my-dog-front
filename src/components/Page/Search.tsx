/* eslint-disable consistent-return */
import '../PageStyle/Search.scss';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import profil from '../../../public/images/profil.jpg';
// import SearchBar from '../elements/SearchBar/SearchBar';

const API_URL = 'http://localhost:5000/api';

const search = async (formData: {
  dateStart: string;
  dateEnd: string;
  city: string;
  label: string;
}) => {
  const { dateStart, dateEnd, city, label } = formData;
  const token = localStorage.getItem('token');
  const queryParams = new URLSearchParams({
    date_start: dateStart,
    date_end: dateEnd,
    city,
    animal_label: label,
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

function Search() {
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
    city: '',
    label: '',
  });
  const [resultCount, setResultCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await search(formData);
      setResultCount(response.length);
      setData(response);
      console.log('recherche OK', data);
      setFormData({
        dateStart: '',
        dateEnd: '',
        city: '',
        label: '',
      });
    } catch (error) {
      console.error('recherche non conforme:', error);
    }
  };
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
    <section>
      <section className="search-form-position">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            name="city"
            className="search-form-input"
            placeholder="Lieu (département, ville)"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="dateStart"
            className="search-form-input"
            placeholder="garde du: format 2024-07-22"
            value={formData.dateStart}
            onChange={handleChange}
          />
          <input
            type="text"
            name="dateEnd"
            className="search-form-input"
            placeholder="garde jusqu'au: format 2024-07-29"
            value={formData.dateEnd}
            onChange={handleChange}
          />
          {/* TODO transformer l'input en select */}
          <input
            type="text"
            name="label"
            className="search-form-input"
            placeholder="animaux"
            value={formData.label}
            onChange={handleChange}
          />
          <button type="submit" className="search-form-button">
            Validé
          </button>
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
