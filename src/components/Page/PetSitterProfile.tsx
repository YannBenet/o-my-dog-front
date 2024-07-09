/* eslint-disable import/no-absolute-path */
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { PetSitterSelection } from '../../schema/petSitter.schema';
import '../PageStyle/PersonalProfile.scss';
import { z } from 'zod';
import PhotoProfil from '/images/profil.jpg';

const API_URL = 'http://localhost:5000/api';
const fetchPetSitter = async (id: string | undefined) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found');
  }
  try {
    const response = await fetch(`${API_URL}/announcements/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error("Ce Pet-Sitter n'est pas disponible");
    }
    const data = await response.json();

    const parseData = PetSitterSelection.parse(data);

    return parseData;
  } catch (error) {
    console.error('Erreur de chargement des données du petsitter', error);
    if (error instanceof z.ZodError) {
      console.error('Erreur de validation Zod:', error.errors);
    }
    throw error;
  }
};
function PetSitterProfile() {
  const { id } = useParams();
  console.log('ID de usePArams', id);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['petSitter', id],
    queryFn: () => fetchPetSitter(id),
  });
  if (isLoading) {
    return <p>LOADING.....</p>;
  }
  if (isError) {
    return <p>Erreur de chargement de la page</p>;
  }
  const user = data;
  if (!user) {
    return <p>Profil non trouvé</p>;
  }
  console.log(user);

  return (
    <section className="profile">
      <h2 className="profile-selected">Profil Selectionné</h2>
      <section className="profile-container">
        <img
          src={PhotoProfil}
          alt="profil"
          className="profile-container-photo"
        />

        <div className="profile-container-info">
          <p className="profile-container-info-contact">Pour le contacter</p>
          <p>Nom:</p>
          <h2>{user.firstname}</h2>
          <p>Prénom:</p>
          <h2>{user.lastname}</h2>
          <p>numéro de téléphone:</p>
          <h2>{user.phone_number}</h2>
          <p>adresse mail:</p>
          <h2>{user.email}</h2>
        </div>
      </section>
      <section className="profile-available">
        <div className="profile-available-description">
          <h3>Sa description</h3>
          <div className="profile-available-description-text">
            <p>{user.description}</p>
          </div>
        </div>
        <section className="profile-available-entrie">
          <div className="profile-available-entrie-title">
            <h4>Ses Disponibilités :</h4>
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
              du: {user.date_start}
            </p>
            <p className="profile-available-entrie-period-date profile-available-entrie-period-date-off">
              au: {user.date_end}
            </p>
          </div>
          <div className="profile-available-entrie-period">
            <p className="profile-available-entrie-period-date profile-available-entrie-period-date-on">
              du: {user.date_start}
            </p>
            <p className="profile-available-entrie-period-date profile-available-entries-period-date-off">
              au: {user.date_end}
            </p>
          </div>
        </section>
      </section>
    </section>
  );
}

export default PetSitterProfile;
