/* eslint-disable import/no-absolute-path */
import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { getUser } from '../../api';
import '../PageStyle/PersonalProfile.scss';
import PhotoProfil from '/images/profil.jpg';
import { PetSitter } from '../../@types';

function Profile() {
  // recupération de l'id via l'URL
  const { id } = useParams();
  const [user, setUser] = useState<PetSitter | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser(id); // appel de la fonstion API avec l'id
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    fetchUserData();
  }, [id]);

  if (!user) {
    return <div> Pas de donnée, Domage </div>;
  }

  return (
    <section className="profile">
      <section className="profile-container">
        <img
          src={PhotoProfil}
          alt="profil"
          className="profile-container-photo"
        />

        <div className="profile-container-info">
          <p className="profile-container-info-category">Nom:</p>
          <h2>{user.firstname}</h2>
          <p className="profile-container-info-category">Prénom:</p>
          <h2>{user.lastname}</h2>
          <p>numéro de téléphone:</p>
          <h2>{user.phone_number}</h2>
          <p>adresse mail:</p>
          <h2>{user.email}</h2>
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
            Proposer mes disponibilités de garde
          </button>
        </NavLink>
      </section>
      <section className="profile-available">
        <div className="profile-available-description">
          <h3>Ma description</h3>
          <div className="profile-available-description-text">
            <p>{user.description}</p>
          </div>
        </div>
        {user.date_start && (
          <section className="profile-available-entrie">
            <div className="profile-available-entrie-title">
              <h4>Mes Disponibilités :</h4>
            </div>
            <div className="profile-available-entrie-period">
              <p className="profile-available-entrie-period-date profile-available-entrie-period-date-on">
                du: {user.date_start}
              </p>
              <p className="profile-available-entrie-period-date profile-available-entrie-period-date-off">
                au: {user.date_end}
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
        )}
      </section>
    </section>
  );
}

export default Profile;
