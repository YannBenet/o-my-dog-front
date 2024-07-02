/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line import/no-absolute-path
import logo from '/logoOMyDog.png';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import profilePicture from '../../../../public/images/profil.jpg';

function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [connect, setConnect] = useState(true);

  const handleClick = () => setIsVisible(!isVisible);
  const handleConnect = () => setConnect(!connect);

  return (
    <header className="header">
      <img src={logo} className="header-logo" alt="logo" />
      <section className="header-position">
        <section className="header-position-left">
          <nav className="header-nav">
            <ul className="header-nav-list">
              <li className="header-nav-list-link">
                <NavLink to="/" className="header-nav-list-link-dir">
                  Acceuil
                </NavLink>
              </li>
              <li className="header-nav-list-link">
                <NavLink to="/Search" className="header-nav-list-link-dir">
                  Recherche
                </NavLink>
              </li>
              {/* attention au hidden mon profil sera accessible que si connecté */}
              <li className="header-nav-list-link">
                <NavLink to="/Profil" className="header-nav-list-link-dir">
                  Mon profil
                </NavLink>
              </li>
            </ul>
          </nav>
        </section>
        <section className="header-position-right">
          <NavLink
            to="/Inscription"
            className={!connect ? 'header-button' : 'header-button-connected'}
          >
            inscription
          </NavLink>
          <NavLink
            to="/Connexion"
            className={!connect ? 'header-button' : 'header-button-connected'}
          >
            connexion
          </NavLink>
          <button
            type="button"
            className={
              connect
                ? 'header-button-picture'
                : 'header-button-picture-disconnect '
            }
            onClick={handleClick}
          >
            <img src={profilePicture} alt="profil" />
          </button>
          {/* menu qui s'ouvre et se ferme suivant l'appui sur la photo de son profil dans le header */}
          <nav className="connect">
            <ul
              className={
                !isVisible ? 'connect-navBar' : 'connect-navBar-hidden'
              }
            >
              <li>
                <NavLink to="/" className="connect-navBar-menu">
                  Acceuil
                </NavLink>
              </li>
              <li>
                <NavLink to="/Search" className="connect-navBar-menu">
                  Recherche
                </NavLink>
              </li>
              <li>
                <NavLink to="/profil" className="connect-navBar-menu">
                  Mon profil
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profil/editprofil"
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
                    handleConnect();
                    handleClick();
                  }}
                >
                  déconnexion
                </NavLink>
              </li>
              {/* <li>
                <button
                  type="button"
                  className="connect-navBar-menu-closed"
                  onClick={handleClick}
                >
                  Fermer le menu
                </button>
              </li> */}
            </ul>
          </nav>
        </section>
      </section>
    </header>
  );
}

export default Header;
