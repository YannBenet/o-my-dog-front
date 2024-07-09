/* eslint-disable consistent-return */
/* eslint-disable import/no-absolute-path */
import './SearchBar.scss';

import bannerOne from '/images/bannerOne.jpg';
import bannerTwo from '/images/bannerTwo.jpg';
import bannerThree from '/images/bannerThree.jpg';
import { useState } from 'react';

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

function SearchBar() {
  const [formData, setFormData] = useState({
    dateStart: '',
    dateEnd: '',
    city: '',
    label: '',
  });
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
    <section className="search-banner">
      <section className="search-banner-img">
        <img
          src={bannerOne}
          alt="bannière représantant un animal"
          className="search-banner-img-solo"
        />
        <img
          src={bannerTwo}
          alt="bannière représantant un animal"
          className="search-banner-img-solo"
        />
        <img
          src={bannerThree}
          alt="bannière représantant un animal"
          className="search-banner-img-solo"
        />
      </section>
      <section className="search-banner-form-position">
        <form onSubmit={handleSubmit} className="search-banner-form">
          <input
            type="text"
            name="city"
            className="search-banner-form-input"
            placeholder="Lieu (département, ville)"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="dateStart"
            className="search-banner-form-input"
            placeholder="garde du: format 2024-07-22"
            value={formData.dateStart}
            onChange={handleChange}
          />
          <input
            type="text"
            name="dateEnd"
            className="search-banner-form-input"
            placeholder="garde jusqu'au: format 2024-07-29"
            value={formData.dateEnd}
            onChange={handleChange}
          />
          {/* TODO transformer l'input en select */}
          <input
            type="text"
            name="label"
            className="search-banner-form-input"
            placeholder="animaux"
            value={formData.label}
            onChange={handleChange}
          />
          <button type="submit" className="search-banner-form-button">
            Validé
          </button>
        </form>
      </section>
    </section>
  );
}

export default SearchBar;
