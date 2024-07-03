/* eslint-disable import/no-absolute-path */

import { NavLink } from 'react-router-dom';
import '../PageStyle/PersonalProfile.scss';
import PhotoProfil from '/images/profil.jpg';

function Profile() {
  return (
    <section className="profile">
      <section className="profile-container">
        <img
          src={PhotoProfil}
          alt="profil"
          className="profile-container-photo"
        />

        <div className="profile-container-info">
          <h2>Nom: ....... Prenom: .....</h2>
          <p>numéro de téléphone: ....</p>
          <p>adresse mail: ....</p>
        </div>
      </section>

      <section className="profile-link">
        <NavLink to="/Search">
          <button type="button" className="profile-link-button">
            Faire garder mon animal
          </button>
        </NavLink>
        <NavLink to="/Availability">
          <button type="button" className="profile-link-button">
            Proposer mes disponibilité de garde
          </button>
        </NavLink>
      </section>
      <section className="profile-available">
        <div className="profile-available-description">
          <h3>Ma description</h3>
          <div className="profile-available-description-text">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptatum voluptates commodi nam asperiores laborum officia,
              eligendi dolores. Aliquid, laudantium! Iusto sint ex provident
              adipisci aut vitae fuga ipsam hic excepturi atque eum numquam nemo
              ad, delectus, asperiores laudantium ducimus sed dolore
              accusantium. Dolorum minus tenetur iste unde doloribus possimus
              blanditiis.
            </p>
          </div>
        </div>
        <section className="profile-available-entrie">
          <div className="profile-available-entrie-title">
            <h4>Mes Disponibilités :</h4>
          </div>
          <div className="profile-available-entrie-period">
            <p className="profile-available-entrie-period-date profile-available-entrie-period-date-on">
              du: 10/07/2024
            </p>
            <p className="profile-available-entrie-period-date profile-available-entrie-period-date-off">
              au: 10/07/2024
            </p>
          </div>
          <div className="profile-available-entrie-period">
            <p className="profile-available-entrie-period-date profile-available-entrie-period-date-on">
              du: 10/07/2024
            </p>
            <p className="profile-available-entrie-period-date profile-available-entrie-period-date-off">
              au: 10/07/2024
            </p>
          </div>
          <div className="profile-available-entrie-period">
            <p className="profile-available-entrie-period-date profile-available-entrie-period-date-on">
              du: 10/07/2024
            </p>
            <p className="profile-available-entrie-period-date profile-available-entries-period-date-off">
              au: 10/07/2024
            </p>
          </div>
        </section>
      </section>
    </section>
  );
}

export default Profile;
