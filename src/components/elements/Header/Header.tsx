/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line import/no-absolute-path
import logo from '/logoOMyDog.png';
import './Header.scss';
import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import profilePicture from '../../../../public/images/profil.jpg';
import { PetSitter } from '../../../@types';
import { getUser } from '../../../api';

function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [connect, setConnect] = useState(true);

  const handleClick = () => setIsVisible(!isVisible);
  const handleConnect = () => setConnect(!connect);

  const { id } = useParams();
  const [user, setUser] = useState<PetSitter | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser(id); // appel de la fonstion API avec l'id
        setUser(userData);
        console.log(userData);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    fetchUserData();
  }, [id]);

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
              {/* attention au hidden mon profil sera accessible que si connecté */}
              {/* <li className="header-nav-list-link">
                <NavLink to="/Profile/:id" className="header-nav-list-link-dir">
                  Mon profil
                </NavLink>
              </li> */}
            </ul>
          </nav>
        </section>
        <section className="header-position-right">
          {!user && (
            <NavLink
              to="/Inscription"
              className={connect ? 'header-button' : 'header-button-connected'}
            >
              inscription
            </NavLink>
          )}
          {!user && (
            <NavLink
              to="/Connexion"
              className={connect ? 'header-button' : 'header-button-connected'}
            >
              connexion
            </NavLink>
          )}
          {user && (
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
          )}
          {/* menu qui s'ouvre et se ferme suivant l'appui sur la photo de son profil dans le header */}
          <nav className="connect">
            <ul
              className={
                !isVisible ? 'connect-navBar' : 'connect-navBar-hidden'
              }
            >
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
                <NavLink to="/Profile/:id" className="connect-navBar-menu">
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
                    handleConnect();
                    handleClick();
                  }}
                >
                  déconnexion
                </NavLink>
              </li>
            </ul>
          </nav>
        </section>
      </section>
    </header>
  );
}

export default Header;
