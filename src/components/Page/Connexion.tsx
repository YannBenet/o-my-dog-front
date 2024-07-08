/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useQueryClient } from '@tanstack/react-query';
import '../PageStyle/Connexion.scss';

const loginUser = async (formData: { email: string; password: string }) => {
  try {
    const response = await fetch(`${import.meta.env.API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Connexion échoué');
    }
    return await response.json();
  } catch (error) {
    console.error('Error posting data', error);
  }
};

function Connexion() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      console.log('Connexion réussi', response);
      // enregistrement du token en localStorage
      const { token } = response;
      if (!token || typeof token !== 'string') {
        throw new Error('Invalid token specified: must be a string');
      }
      // stockage du token JWT dans localStorage
      localStorage.setItem('token', token);
      // recuperation de l'id pour redirection sur page profil
      const decodedToken = jwtDecode(token);

      const userId = decodedToken.data.id;
      console.log(userId);

      // effacer les données précédentes du cache de React Query
      queryClient.invalidateQueries('user');

      // Réinitialisation du formulaire aprés la connexion réussi
      setFormData({
        email: '',
        password: '',
      });
      // Redirection vers la page profil de l'utilisatuer connecté
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
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
          className="container-connexion-form-input"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de Passe"
          className="container-connexion-form-input"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="container-connexion-form-button">
          Se Connecter
        </button>
      </form>
    </section>
  );
}

export default Connexion;
