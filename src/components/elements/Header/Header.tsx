/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line import/no-absolute-path
import logo from '/logoOMyDog.png';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <img src={logo} className="header-logo" alt="logo" />
      <section className="header-position">
        <section className="header-position-left">
          <nav className="header-nav">
            <ul className="header-nav-list">
              <li className="header-nav-list-link">
                <a href="/" className="header-nav-list-link-dir">
                  Acceuil
                </a>
              </li>
              <li className="header-nav-list-link">
                <a href="#" className="header-nav-list-link-dir">
                  Recherche
                </a>
              </li>
            </ul>
          </nav>
        </section>
        <section className="header-position-right">
          <a href="/Inscription" className="header-button">
            inscription
          </a>
          <a href="/Connexion" className="header-button">
            connexion
          </a>
        </section>
      </section>
    </header>
  );
}

export default Header;
