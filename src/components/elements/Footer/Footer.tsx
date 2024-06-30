/* eslint-disable jsx-a11y/anchor-is-valid */
import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <ul className="footer-container">
        <li className="footer-container-list">
          <a className="footer-container-list-link" href="/contact">
            Contact
          </a>
        </li>
        <li className="footer-container-list">
          <a className="footer-container-list-link" href="/WhoAreWe">
            Qui somme nous?
          </a>
        </li>
        <li className="footer-container-list">
          <a className="footer-container-list-link" href="/LegalInformation">
            Mentions légals
          </a>
        </li>
        <li className="footer-container-list">
          <a className="footer-container-list-link" href="/GeneralCondition">
            Condition générales
          </a>
        </li>
        <li className="footer-container-list">
          <a className="footer-container-list-link" href="/DataProtection">
            Protection des données
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
