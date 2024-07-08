import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import './FirstSearch.scss';
import profil from '../../../../public/images/profil.jpg';
import { PetSittersResponseSchema } from '../../../schema/petSitter.schema';

const fetchPetSittersHighlight = async () => {
  const response = await fetch(
    `${import.meta.env.API_URL}/announcements/highlight`
  );
  const data = await response.json();
  const transformedData = { petSitters: data };
  try {
    return PetSittersResponseSchema.parse(transformedData); // Utilisez `parse` pour valider les données
  } catch (error) {
    console.error('Error parsing data:', error);
    throw error; // Rejette l'erreur pour que React Query la capture
  }
};

function FirstSelection() {
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
    <article className="selection-card" key={petSitter.email}>
      <Link to={`/PetSitter/${petSitter.id}`} className="selecttion-card-link">
        <img src={profil} alt="profil" />
        <h3>
          {petSitter.firstname} {petSitter.lastname}
        </h3>
        <h4>{petSitter.city}</h4>
      </Link>
    </article>
  ));

  return <section className="selection">{listPetSitter}</section>;
}

export default FirstSelection;
