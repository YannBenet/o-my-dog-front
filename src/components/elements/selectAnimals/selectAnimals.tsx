import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ListAnimalsSchema } from '../../../schema/petSitter.schema';
import './selectAnimals.scss';

const API_URL = 'http://localhost:5000/api';
interface SelectAnimalsProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
// Recupération de la liste des animaux en BDD
const getListAnimals = async () => {
  const response = await fetch(`${API_URL}/animals`);
  const dataAnimals = await response.json();
  const transformedData = { Animals: dataAnimals };
  try {
    return ListAnimalsSchema.parse(transformedData);
  } catch (error) {
    console.error('Tous les animaux ont étés dévorés!', error);
    throw error;
  }
};
function SelectAnimals({ onChange }: SelectAnimalsProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['Animals'],
    queryFn: getListAnimals,
  });
  if (isLoading) {
    return <p>Nous essayons d&apos;attraper tous les animaux!</p>;
  }
  if (isError) {
    return <p>Tous nos animaux sont en balade!</p>;
  }
  const listAnimals = data?.Animals.map((animal) => (
    <option key={animal.label} value={animal.label}>
      {animal.label}
    </option>
  ));
  return (
    <select
      name="animals"
      id="annimals-select"
      className="animal"
      onChange={onChange}
    >
      <option value="" className="animal-option">
        -- Sélectionnez le type d&apos;animal --
      </option>
      {listAnimals}
    </select>
  );
}

export default SelectAnimals;
