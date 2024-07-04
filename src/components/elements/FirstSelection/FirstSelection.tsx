/* eslint-disable react/jsx-key */
/* eslint-disable import/no-absolute-path */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PetSitter } from '../../../@types';
import './FirstSearch.scss';
import profil from '/images/profil.jpg';

import { fetchData } from '../../../api';

function FirstSelection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
        setLoading(false);
      } catch (error) {
        // setFetchError(error);
        console.error('Error post data', error);
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (fetchError) return <p>Error fetching data: {fetchError}</p>;
  const listPetSitter = data.map((petSitter: PetSitter) => (
    <article className="selection-card">
      <Link to="/PetSitter" className="selecttion-card-link">
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
