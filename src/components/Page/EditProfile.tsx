import '../PageStyle/EditProfile.scss';
import { useState } from 'react';
import { createPath, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const API_URL = 'http://localhost:5000/api';

const editUserProfile = async (formData: {
  firstname: string;
  lastname: string;
  email: string;
  city: string;
  phone_number: string;
  password: string;
  repeatPassword: string;
}) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found');
  }

  const decodedToken: { data: { id: number } } = jwtDecode(token);
  console.log(decodedToken);

  if (formData.password !== formData.repeatPassword) {
    throw new Error('Passwords do not match');
  }

  try {
    const response = await fetch(`${API_URL}/users/${decodedToken.data.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Echec de l'envoi du formulaire");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error posting data', error);
    throw error;
  }
};

function EditProfile() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    city: '',
    phone_number: '',
    password: '',
    repeatPassword: '',
    department_label: '', // Initialisation du champ département
  });
  const [citySuggestions, setCitySuggestions] = useState<
    { nom: string; departement: { nom: string } }[]
  >([]);

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Appel à l'API pour obtenir les suggestions de villes à partir de 3 caractères
    if (name === 'city' && value.length > 2) {
      console.log('cityyyyy', value);

      try {
        const response = await fetch(
          `https://geo.api.gouv.fr/communes?nom=${value}&fields=nom,departement&boost=population&limit=5`
        );

        if (!response.ok) {
          throw new Error(
            'Erreur lors de la récupération des suggestions de villes'
          );
        }
        const data = await response.json();
        console.log(data);
        setCitySuggestions(data);
        console.log(citySuggestions);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des suggestions de villes:',
          error
        );
        setCitySuggestions([]); // Réinitialiser les suggestions en cas d'erreur
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ?? Création d'une copie. Le "let" ne pose pas de problème ?
    let updatedFormData = { ...formData };

    // On vérifie seulement les champs de city s'il y a quelque chose d'écrit dedans.
    if (updatedFormData.city !== '') {
      // Vérification que la ville entrée dans le form est bien une des propositions de l'API
      const selectedCity = citySuggestions.find(
        (city) => city.nom === updatedFormData.city
      );
      if (!selectedCity) {
        setError('Veuillez sélectionner une ville valide dans la liste.');
        return;
      }

      // Ajout du département à la copie locale de formData
      updatedFormData = {
        ...updatedFormData,
        department_label: selectedCity.departement.nom,
      };
    }

    // Suppression des champs vides de la copie locale de formData
    for (const key in updatedFormData) {
      if (updatedFormData[key as keyof typeof updatedFormData] === '') {
        delete updatedFormData[key as keyof typeof updatedFormData];
      }
    }

    try {
      // Appel de editUserProfile avec la copie locale de formData mise à jour
      const response = await editUserProfile(updatedFormData);
      console.log(response);

      if (!response) {
        throw new Error('Réponse indéfinie du serveur');
      }

      console.log('Modification de profile réussie', response);

      // Réinitialisation du formulaire après modification réussie
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        city: '',
        phone_number: '',
        password: '',
        repeatPassword: '',
        department_label: '',
      });
      setError('');
      navigate('/Connexion');
    } catch (error) {
      console.error('Erreur lors de la modification de profil', error);
      setError("Une erreur s'est produite lors la modification du profil.");
    }
  };

  return (
    <section className="container-inscription">
      <h2>Modifier mon profil</h2>
      <section>
        <form onSubmit={handleSubmit} className="container-inscription-form">
          <input type="file" accept=".jpg, .jpeg, .png" capture="environment" />
          <input
            type="text"
            name="firstname"
            placeholder="Prénom"
            className="container-inscription-form-input"
            value={formData.firstname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Nom"
            className="container-inscription-form-input"
            value={formData.lastname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            className="container-inscription-form-input"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="Ville"
            autoComplete="one-time-code"
            className="container-inscription-form-input"
            value={formData.city}
            onChange={handleChange}
            list="city-suggestions"
          />
          <datalist id="city-suggestions">
            {citySuggestions.map((city, index) => (
              <option key={index} value={city.nom} />
            ))}
          </datalist>
          <input
            type="hidden"
            name="department_label"
            value={formData.department_label}
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Numéro de Téléphone"
            className="container-inscription-form-input"
            value={formData.phone_number}
            onChange={handleChange}
          />
          <input
            type="text"
            name="password"
            placeholder="Mot de Passe"
            className="container-inscription-form-input"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="text"
            name="repeatPassword"
            placeholder="Confirmation Mot de Passe"
            className="container-inscription-form-input"
            value={formData.repeatPassword}
            onChange={handleChange}
          />
          {/* Espace pour message si erreur sur la page */}
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="container-inscription-form-button">
            Validé
          </button>
        </form>
      </section>
    </section>
  );
}

export default EditProfile;
