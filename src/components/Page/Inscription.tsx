/* eslint-disable consistent-return */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PageStyle/Inscription.scss';

const API_URL = 'http://localhost:5000/api';
const signinUser = async (formData: {
  firstname: string;
  lastname: string;
  email: string;
  city: string;
  phone_number: string;
  password: string;
  repeatPassword: string;
  department_label: string; // Ajout du champ département
}) => {
  try {
    const response = await fetch(`${API_URL}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Inscription échouée !');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la requête de post :', error);
  }
};

function Inscription() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    city: '',
    phone_number: '',
    password: '',
    repeatPassword: '',
    department_label: '', // Initialisation du champ département
  });
  const [citySuggestions, setCitySuggestions] = useState<
    { nom: string; departement: { nom: string } }[]
  >([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Appel à l'API pour obtenir les suggestions de villes à partir de 3 caractères
    if (name === 'city' && value.length > 2) {
      try {
        const response = await fetch(
          `https://geo.api.gouv.fr/communes?nom=${value}&fields=nom,departement&boost=population&limit=5`
        );
        if (!response.ok) {
          throw new Error(
            'Erreur lors de la récupération des suggestions de villes'
          );
        }
        const data = await response.json();
        setCitySuggestions(data);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des suggestions de villes:',
          error
        );
        setCitySuggestions([]); // Réinitialiser les suggestions en cas d'erreur
      }
    } else {
      setCitySuggestions([]);
    }
  };

  const handleBlur = () => {
    const selectedCity = citySuggestions.find(
      (city) => city.nom === formData.city
    );
    if (selectedCity) {
      setFormData({
        ...formData,
        department_label: selectedCity.departement.nom,
      });
      setError('');
    } else {
      setFormData({
        ...formData,
        department_label: '',
      });
      setError('Veuillez sélectionner une ville valide dans la liste.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedCity = citySuggestions.find(
      (city) => city.nom === formData.city
    );
    if (!selectedCity) {
      setError('Veuillez sélectionner une ville valide dans la liste.');
      return;
    }
    try {
      const response = await signinUser(formData);
      console.log('Inscription réussie', response);
      // Réinitialisation du formulaire après inscription réussie
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        city: '',
        phone_number: '',
        password: '',
        repeatPassword: '',
        department_label: '', // Réinitialiser le champ département
      });
      setError('');
      navigate('/Connexion');
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
      setError("Une erreur s'est produite lors de l'inscription.");
    }
  };

  return (
    <section className="container-inscription">
      <h2>Inscription</h2>
      <section>
        <form onSubmit={handleSubmit} className="container-inscription-form">
          <input
            type="text"
            name="firstname"
            placeholder="Prénom"
            className="container-inscription-form-input"
            value={formData.firstname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Nom"
            className="container-inscription-form-input"
            value={formData.lastname}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="container-inscription-form-input"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="Ville"
            autoComplete="one-time-code"
            className="container-inscription-form-input"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            list="city-suggestions"
          />
          <datalist id="city-suggestions">
            {citySuggestions.map((city, index) => (
              <option key={index} value={city.nom} />
            ))}
          </datalist>
          <input
            type="hidden"
            name="department_label"
            value={formData.department_label}
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Numéro de Téléphone"
            className="container-inscription-form-input"
            value={formData.phone_number}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de Passe"
            className="container-inscription-form-input"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="repeatPassword"
            placeholder="Confirmation Mot de Passe"
            className="container-inscription-form-input"
            value={formData.repeatPassword}
            onChange={handleChange}
          />
          {/* Espace pour message si erreur sur la page */}
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="container-inscription-form-button">
            Valider
          </button>
        </form>
      </section>
    </section>
  );
}

export default Inscription;
