/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../PageStyle/Connexion.scss';
import { jwtDecode } from 'jwt-decode';
import { loginUser } from '../../api';

function Connexion() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
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
      localStorage.setItem('token', token);
      // recuperation de l'id pour redirection sur page profil
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);

      const userId = decodedToken.data.id;
      console.log(userId);
      setFormData({
        email: '',
        password: '',
      });
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
