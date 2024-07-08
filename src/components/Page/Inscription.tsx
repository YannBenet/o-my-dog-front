/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PageStyle/Inscription.scss';

const signinUser = async (formData: {
  firstname: string;
  lastname: string;
  email: string;
  city: string;
  phone_number: string;
  password: string;
  repeatPassword: string;
}) => {
  try {
    const response = await fetch(`${import.meta.env.API_URL}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Inscription échoué!');
    }
    return await response.json();
  } catch (error) {
    console.error('Error post data', error);
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
      const response = await signinUser(formData);
      console.log('inscription réussie', response);
      // Réinitialisation du formulaire après inscription réussi
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        city: '',
        phone_number: '',
        password: '',
        repeatPassword: '',
      });
      navigate('/Connexion');
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
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
            type="text"
            name="email"
            placeholder="email"
            className="container-inscription-form-input"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="ville"
            className="container-inscription-form-input"
            value={formData.city}
            onChange={handleChange}
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
            type="text"
            name="password"
            placeholder="Mot de Passe"
            className="container-inscription-form-input"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="text"
            name="repeatPassword"
            placeholder="Confirmation Mot de Passe"
            className="container-inscription-form-input"
            value={formData.repeatPassword}
            onChange={handleChange}
          />

          <button type="submit" className="container-inscription-form-button">
            Valider
          </button>
        </form>
      </section>
    </section>
  );
}

export default Inscription;
