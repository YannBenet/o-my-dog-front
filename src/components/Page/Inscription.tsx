/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable consistent-return */
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
  department_label: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      return { status: response.status, error: data.error, data: null };
    }

    return { status: response.status, error: null, data };
  } catch (error) {
    console.error('Erreur lors de la requête de post :', error);
    return { status: 500, error };
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
    department_label: '',
  });
  const [citySuggestions, setCitySuggestions] = useState<
    { nom: string; departement: { nom: string; code: string } }[]
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
      } catch (err) {
        console.error(
          'Erreur lors de la récupération des suggestions de villes:',
          err
        );
        setCitySuggestions([]); // Réinitialiser les suggestions en cas d'erreur
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      setError('Les deux mots de passe sont différents');
      return;
    }

    // Vérification que la ville entrée dans le form est bien une des propositions de l'API
    const selectedCityInDepartment = citySuggestions.find(
      (city) =>
        city.departement.code === formData.city.split(' ')[1].slice(1, 3)
    );

    if (!selectedCityInDepartment) {
      setError('Veuillez sélectionner une ville valide dans la liste.');
      return;
    }

    // On ajoute le department_label dans les datas du form

    const updatedFormData = {
      ...formData,
      department_label: selectedCityInDepartment.departement.nom,
    };

    try {
      const response = await signinUser(updatedFormData);

      if (response.error) {
        switch (response.status) {
          case 400:
            setError(`${response.error}`);
            break;
          case 409:
            setError('Conflict: Utilisateur déjà existant.');
            break;
          case 500:
            setError('Une erreur est survenue côté serveur.');
            break;
          default:
            setError(
              "Une erreur inconnue est survenue, contactez l'administrateur."
            );
        }
        return;
      }

      setError('');
      navigate('/Connexion');
    } catch (err) {
      console.error("Erreur lors de l'inscription", err);
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
            list="city-suggestions"
          />
          <datalist id="city-suggestions">
            {citySuggestions.map((city, index) => (
              <option
                key={index}
                value={[`${city.nom} (${city.departement.code})`]}
              />
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
