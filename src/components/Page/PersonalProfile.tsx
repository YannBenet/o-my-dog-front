import { useParams, NavLink } from 'react-router-dom';
// import shcema zod et react query
import { useQuery } from '@tanstack/react-query';
import { PetSitterResponseSchema } from '../../schema/petSitter.schema';
import '../PageStyle/PersonalProfile.scss';
import PhotoProfil from '../../../public/images/profil.jpg';

const API_URL = 'http://localhost:5000/api';
const getUser = async (id: string | undefined) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found');
  }
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error('Données de profil non charger');
    }
    const data = await response.json();
    const transformedData = { petSitter: data };

    return PetSitterResponseSchema.parse(transformedData); // Utilisez `parse` pour valider les données
  } catch (error) {
    console.error('Error parsing data:', error);
    throw error; // Rejette l'erreur pour que React Query la capture
  }
};
function Profile() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  });
  if (isLoading) {
    return <p>LOADING.....</p>;
  }
  if (isError) {
    return <p> Erreur de chargement Profil</p>;
  }
  const user = data?.petSitter;
  return (
    <section className="profile">
      <section className="profile-top">
        <section className="profile-container">
          <img
            src={PhotoProfil}
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
      </section>
      <section className="profile-available">
        <div className="profile-available-description">
          <h3>Ma description</h3>
          {/* <div className="profile-available-description-text">
            il faut revoir la mise en page du profil User
            <p>{user?.description}</p>
          </div> */}
        </div>
        {/* {user?.date_start && ( */}
        <section className="profile-available-entrie">
          <div className="profile-available-entrie-title">
            <h4>Mes Disponibilités :</h4>
          </div>
          <div className="profile-available-entrie-period">
            <p className="profile-available-entrie-period-date profile-available-entrie-period-date-on">
              du:
              {/* {user.date_start} */}
            </p>
            <p className="profile-available-entrie-period-date profile-available-entrie-period-date-off">
              au:
              {/* {user.date_end} */}
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
        {/* )} */}
      </section>
    </section>
  );
}

export default Profile;
