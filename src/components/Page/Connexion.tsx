/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useQueryClient } from '@tanstack/react-query';
import '../PageStyle/Connexion.scss';

const API_URL = 'http://localhost:5000/api';
const loginUser = async (formData: { email: string; password: string }) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      return { status: response.status, error: data.error, data: null };
    }

    return { status: response.status, error: null, data };
  } catch (error) {
    console.error('Error posting data', error);
    return { status: 500, error };
  }
};

interface DecodedToken {
  data: {
    id: string;
  };
}

function Connexion() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [errorField, setErrorField] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorField({ ...errorField, [name]: false }); // Remove error styling on input change
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      if (response.error) {
        switch (response.status) {
          case 400:
            setError(`Le format du mot de passe est incorrect`);
            setErrorField({ email: false, password: true });
            break;
          case 401:
            setError('Le mail ou le mot de passe est incorrect');
            setErrorField({ email: true, password: true });
            break;
          case 500:
            setError('Une erreur est survenue côté serveur.');
            break;
          default:
            setError(
              "Une erreur inconnue est survenue, contactez l'administrateur."
            );
        }
        return; // Exit the function if there's an error
      }
      // enregistrement du token en localStorage

      const { accessToken } = response.data;
      if (!accessToken || typeof accessToken !== 'string') {
        throw new Error('Invalid token specified: must be a string');
      }
      // stockage du token JWT dans localStorage
      localStorage.setItem('token', accessToken);
      // recuperation de l'id pour redirection sur page profil
      const decodedToken = jwtDecode<DecodedToken>(accessToken);

      const userId = decodedToken.data.id;
      localStorage.setItem('userId', userId);

      // effacer les données précédentes du cache de React Query
      queryClient.invalidateQueries({ queryKey: ['user'] });

      // Réinitialisation du formulaire aprés la connexion réussi
      setFormData({
        email: '',
        password: '',
      });
      // Redirection vers la page profil de l'utilisatuer connecté
      navigate(`/profile/${userId}`);
    } catch (err) {
      console.error('Erreur lors de la connexion', err);
    }
  };

  return (
    <section className="container-connexion">
      <div className="container-switch">
        <p className="container-switch-text">
          Si vous n'avez pas de compte veuillez en créer un!
        </p>
        <NavLink to="/Inscription" className="container-switch-button">
          Inscription
        </NavLink>
      </div>
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit} className="container-connexion-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={`container-connexion-form-input ${errorField.email ? 'error-border' : ''}`}
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de Passe"
          className={`container-connexion-form-input ${errorField.password ? 'error-border' : ''}`}
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="container-connexion-form-button">
          Se Connecter
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </section>
  );
}

export default Connexion;
