/* eslint-disable import/no-absolute-path */
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { PetSitterSelection } from '../../schema/petSitter.schema';
import '../PageStyle/PersonalProfile.scss';
import { z } from 'zod';
import PhotoProfil from '/images/profil.jpg';

const API_URL = import.meta.env.VITE_REACT_APP_BACK;
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
  // formatage de la date
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <section className="profile">
      <h2 className="profile-selected">Profil Selectionné</h2>
      <section className="profile-container">
        <img
          src={user?.url_img || PhotoProfil}
          alt="profil"
          className="profile-container-photo"
        />

        <div className="profile-container-info">
          <h2 className="profile-container-info-category">
            <span>Nom:</span>
            {user?.firstname}
          </h2>
          <h2 className="profile-container-info-category">
            <span>Prénom:</span>
            {user?.lastname}
          </h2>
          <h2 className="profile-container-info-category">
            <span>numéro de téléphone:</span>
            {user?.phone_number}
          </h2>
          <h2 className="profile-container-info-category">
            <span>adresse mail:</span>
            {user?.email}
          </h2>
          <h2 className="profile-container-info-category">
            <span>Ville:</span>
            {user?.city}
          </h2>
          <h2 className="profile-container-info-category">
            <span>Je peux garder:</span>
            {user.animal_label?.join(', ')}
          </h2>
        </div>
      </section>
      <section className="profile-available">
        <div className="profile-available-description">
          <h3>Son annonce</h3>
          <div className="profile-available-description-text">
            <p>{user.description}</p>
          </div>
        </div>
        <section className="profile-available-entrie">
          <div className="profile-available-entrie-title">
            <h4>Pour la période :</h4>
          </div>
          <div className="profile-available-entrie-period">
            <p className="profile-available-entrie-period-date profile-available-entrie-period-date-on">
              du: {formatDate(user.date_start)}
            </p>
            <p className="profile-available-entrie-period-date profile-available-entrie-period-date-off">
              au: {formatDate(user.date_end)}
            </p>
          </div>
        </section>
      </section>
    </section>
  );
}

export default PetSitterProfile;
