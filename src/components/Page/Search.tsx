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
      console.log('recherche OK', response);
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
        <section className="search-container-result">
          <article className="search-container-result-card">
            <div className="search-container-result-card-img">
              <img src={profil} alt="profil" />
            </div>
            <div className="search-container-result-card-text">
              <h4>Nom Prénom</h4>
              <h6>description</h6>
              <div className="search-container-result-card-description">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde
                  eum similique autem, quia fugit provident excepturi, sit
                  nesciunt cumque, nam quo architecto beatae quibusdam optio
                  possimus quaerat saepe voluptatum ratione debitis. Amet,
                  praesentium ad? Dolore sed adipisci expedita? Dignissimos,
                  obcaecati. Corrupti aspernatur ratione optio culpa. Qui
                  voluptatem alias esse autem?
                </p>
              </div>
              <div className="search-container-result-card-date">
                <h6>Disponibilités</h6>
                <p>du 15-07-2024 au 30-07-2024</p>
              </div>
              <NavLink
                to="/PetSitter"
                type="button"
                className="search-container-result-card-button"
              >
                Voir Profil
              </NavLink>
            </div>
          </article>
          <article className="search-container-result-card">
            <div className="search-container-result-card-img">
              <img src={profil} alt="profil" />
            </div>
            <div className="search-container-result-card-text">
              <h4>Nom Prénom</h4>
              <h6>description</h6>
              <div className="search-container-result-card-description">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde
                  eum similique autem, quia fugit provident excepturi, sit
                  nesciunt cumque, nam quo architecto beatae quibusdam optio
                  possimus quaerat saepe voluptatum ratione debitis. Amet,
                  praesentium ad? Dolore sed adipisci expedita? Dignissimos,
                  obcaecati. Corrupti aspernatur ratione optio culpa. Qui
                  voluptatem alias esse autem?
                </p>
              </div>
              <div className="search-container-result-card-date">
                <h6>Disponibilités</h6>
                <p>du 15-07-2024 au 30-07-2024</p>
              </div>
              <NavLink
                to="/PetSitter"
                type="button"
                className="search-container-result-card-button"
              >
                Voir Profil
              </NavLink>
            </div>
          </article>
          <article className="search-container-result-card">
            <div className="search-container-result-card-img">
              <img src={profil} alt="profil" />
            </div>
            <div className="search-container-result-card-text">
              <h4>Nom Prénom</h4>
              <h6>description</h6>
              <div className="search-container-result-card-description">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                  itaque ut a eos, assumenda quo.
                </p>
              </div>
              <div className="search-container-result-card-date">
                <h6>Disponibilités</h6>
                <p>du 15-07-2024 au 30-07-2024</p>
              </div>
              <NavLink
                to="/PetSitter"
                type="button"
                className="search-container-result-card-button"
              >
                Voir Profil
              </NavLink>
            </div>
          </article>
        </section>
      </section>
    </section>
  );
}

export default Search;
