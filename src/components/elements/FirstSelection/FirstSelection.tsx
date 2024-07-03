/* eslint-disable react/jsx-key */
/* eslint-disable import/no-absolute-path */
import { Link } from 'react-router-dom';
import { PetSitter } from '../../../@types';
import './FirstSearch.scss';
import profil from '/images/profil.jpg';

type PetSittersProps = {
  firstList: PetSitter[];
};

function FirstSelection({ firstList }: PetSittersProps) {
  const listPetSitter = firstList.map((petSitter) => (
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
