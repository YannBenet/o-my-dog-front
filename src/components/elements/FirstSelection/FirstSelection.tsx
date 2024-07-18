import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import './FirstSearch.scss';
import profil from '../../../../public/images/profil.jpg';
import { PetSittersResponseSchema } from '../../../schema/petSitter.schema';

const API_URL = import.meta.env.VITE_REACT_APP_BACK;
const fetchPetSittersHighlight = async () => {
  const response = await fetch(`${API_URL}/announcements/highlight`);
  const data = await response.json();
  const transformedData = { petSitters: data };

  try {
    return PetSittersResponseSchema.parse(transformedData); // Utilisez `parse` pour valider les données
  } catch (error) {
    console.error('Error parsing data:', error);
    throw error; // Rejette l'erreur pour que React Query la capture
  }
};
// formatage de la date
const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

function FirstSelection() {
  const isLoggedIn = localStorage.getItem('token') !== null;
  const { data, isLoading, isError } = useQuery({
    queryKey: ['petSitters'],
    queryFn: fetchPetSittersHighlight,
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Erreur de chargement des données !</p>;
  }
  const listPetSitter = data?.petSitters.map((petSitter) => (
    <article className="selection-card" key={petSitter.announcement_id}>
      {isLoggedIn && (
        <Link
          to={`/PetSitter/${petSitter.announcement_id}`}
          className="selecttion-card-link"
        >
          <img src={petSitter?.url_img || profil} alt="profil" />
          <h3>
            {petSitter.firstname} {petSitter.lastname}
          </h3>
          <p>
            Disponible du {formatDate(petSitter.date_start)}
            <br />
            au {formatDate(petSitter.date_end)}
          </p>
          <h4>{petSitter.city}</h4>
        </Link>
      )}
      {!isLoggedIn && (
        <Link to="/Connexion" className="selecttion-card-link">
          <img src={petSitter.url_img || profil} alt="profil" />
          <h3>
            {petSitter.firstname} {petSitter.lastname}
          </h3>
          <p>
            Disponible du {formatDate(petSitter.date_start)}
            <br />
            au {formatDate(petSitter.date_end)}
          </p>
          <h4>{petSitter.city}</h4>
        </Link>
      )}
    </article>
  ));

  return <section className="selection">{listPetSitter}</section>;
}

export default FirstSelection;
