/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink } from 'react-router-dom';
import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <ul className="footer-container">
        <li className="footer-container-list">
          <NavLink className="footer-container-list-link" to="/contact">
            Contact
          </NavLink>
        </li>
        <li className="footer-container-list">
          <NavLink className="footer-container-list-link" to="/WhoAreWe">
            Qui sommes-nous?
          </NavLink>
        </li>
        <li className="footer-container-list">
          <NavLink
            className="footer-container-list-link"
            to="/LegalInformation"
          >
            Mentions légales
          </NavLink>
        </li>
        <li className="footer-container-list">
          <NavLink
            className="footer-container-list-link"
            to="/GeneralCondition"
          >
            Conditions générales
          </NavLink>
        </li>
        <li className="footer-container-list">
          <NavLink className="footer-container-list-link" to="/DataProtection">
            Protection des données
          </NavLink>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
