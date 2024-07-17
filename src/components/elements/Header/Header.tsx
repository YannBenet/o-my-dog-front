/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line import/no-absolute-path
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '/logoOMyDog.png';
import './Header.scss';
import { jwtDecode } from 'jwt-decode';
import photo from '../../../../public/images/profil.jpg';

const API_URL = import.meta.env.VITE_REACT_APP_BACK;

function Header() {
  const [userId, setUserId] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedPicture = localStorage.getItem('url_img');
    setProfilePicture(storedPicture);
    setToken(storedToken);
  }, [location]);

  const isLoggedIn = token !== null;

  const disconnect = async (id: number | undefined, token: string | null) => {
    if (!token) {
      throw new Error('token not found');
    }
    try {
      const response = await fetch(`${API_URL}/users/logout/${id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Echec de déconnexion');
      }
    } catch (error) {
      console.error('erreur lors de la déconnexion', error);
    }
  };

  const handleClick = () => setIsVisible(!isVisible);

  const handleDeconnect = async (id: number) => {
    try {
      await disconnect(id, token);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('url_img');
      setUserId(0);
      window.location.reload();
    } catch (error) {
      console.log('erreur lors de la déconnexion', error);
    }
  };

  useEffect(() => {
    // recuperation de l'id pour redirection sur page profil
    const token: string | null = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.data.id);
      } catch (error) {
        console.error('Erreur décodage token:', error);
      }
    }
  }, [location]); // mise à jour lorsque changement de page

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
              <img src={profilePicture || photo} alt="profil" />
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
                    to={`/Profile/${userId}`}
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
                      handleDeconnect(userId);
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
