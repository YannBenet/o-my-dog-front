/* eslint-disable react/jsx-key */
/* eslint-disable import/no-absolute-path */
import { PetSitter } from '../../../@types';
import './FirstSearch.scss';
import profil from '/images/profil.jpg';

type PetSittersProps = {
  firstList: PetSitter[];
};

function FirstSelection({ firstList }: PetSittersProps) {
  const listPetSitter = firstList.map((petSitter) => (
    <article className="selection-card">
      <img src={profil} alt="profil" />
      <h3>
        {petSitter.firstname} {petSitter.lastname}
      </h3>
      <h4>{petSitter.city}</h4>
    </article>
  ));

  return <section className="selection">{listPetSitter}</section>;
}

export default FirstSelection;
