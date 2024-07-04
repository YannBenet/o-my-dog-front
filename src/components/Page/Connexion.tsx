/* eslint-disable react/no-unescaped-entities */
import { NavLink } from 'react-router-dom';
import '../PageStyle/Connexion.scss';
import { loginUser } from '../../api';

function Connexion() {
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
      <form action="submit" className="container-connexion-form">
        <input
          type="text"
          placeholder="Email"
          className="container-connexion-form-input"
        />
        <input
          type="text"
          placeholder="Mot de Passe"
          className="container-connexion-form-input"
        />
        <button type="submit" className="container-connexion-form-button">
          Se Connecter
        </button>
      </form>
    </section>
  );
}

export default Connexion;
