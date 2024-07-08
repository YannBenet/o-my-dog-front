/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line import/no-absolute-path
import logo from '/logoOMyDog.png';
import './Header.scss';
import { NavLink, useParams } from 'react-router-dom';
import { useState } from 'react';
import profilePicture from '../../../../public/images/profil.jpg';

function Header() {
  const isLoggedIn = localStorage.getItem('token') !== null;
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => setIsVisible(!isVisible);
  const handleDeconnect = () => {
    localStorage.removeItem('token');
  };

  return (
    <header className="header">
      <NavLink to="/">
        <img src={logo} className="header-logo" alt="logo" />
      </NavLink>
      <section className="header-position">
        <section className="header-position-left">
          <nav className="header-nav">
            <ul className="header-nav-list">
              <li className="header-nav-list-link">
                <NavLink to="/" className="header-nav-list-link-dir">
                  Accueil
                </NavLink>
              </li>
              <li className="header-nav-list-link">
                <NavLink to="/Search" className="header-nav-list-link-dir">
                  Recherche
                </NavLink>
              </li>
            </ul>
          </nav>
        </section>
        <section className="header-position-right">
          {!isLoggedIn && (
            <div className="header-buttons">
              <NavLink to="/Inscription" className="header-buttons-button">
                inscription
              </NavLink>

              <NavLink to="/Connexion" className="header-buttons-button">
                connexion
              </NavLink>
            </div>
          )}
          {isLoggedIn && (
            <button
              type="button"
              className="header-buttons-button-picture"
              onClick={handleClick}
            >
              <img src={profilePicture} alt="profil" />
            </button>
          )}
          {/* menu qui s'ouvre et se ferme suivant l'appui sur la photo de son profil dans le header */}
          {isLoggedIn && (
            <nav
              className={
                !isVisible ? 'connect-navBar' : 'connect-navBar-hidden'
              }
            >
              <ul>
                <li>
                  <NavLink to="/" className="connect-navBar-menu">
                    Accueil
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Search" className="connect-navBar-menu">
                    Recherche
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/Profile/${id}`}
                    className="connect-navBar-menu"
                  >
                    Mon profil
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile/editprofile"
                    className="connect-navBar-menu"
                  >
                    Modification profil
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className="connect-navBar-menu"
                    onClick={() => {
                      handleDeconnect();
                      handleClick();
                    }}
                  >
                    déconnexion
                  </NavLink>
                </li>
              </ul>
            </nav>
          )}
        </section>
      </section>
    </header>
  );
}

export default Header;
