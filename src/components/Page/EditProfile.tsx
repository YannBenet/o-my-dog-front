import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../PageStyle/EditProfile.scss';

const API_URL = import.meta.env.VITE_REACT_APP_BACK;

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

  try {
    const response = await fetch(`${API_URL}/users/${decodedToken.data.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      return { status: response.status, error: data.error, data: null };
    }

    return { status: response.status, error: null, data };
  } catch (error) {
    console.error('Error posting data', error);
    return { status: 500, error };
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

  const [file, setFile] = useState(null); // Ajout du state pour le fichier
  const [citySuggestions, setCitySuggestions] = useState<
    { nom: string; departement: { nom: string } }[]
  >([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'file') {
      if (files && files[0]) {
        setFile(files[0]);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      if (name === 'city' && value.length > 2) {
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
          setCitySuggestions(data);
        } catch (error) {
          console.error(
            'Erreur lors de la récupération des suggestions de villes:',
            error
          );
          setCitySuggestions([]);
        }
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      setError('Les mots de passe sont différents');
      return;
    }
    const updatedFormData = new FormData();
    // On va récupérer toutes les clés et valeurs du formulaires qui ne sont pas vides pour les attribuer à un FormData qui sera envoyé au front
    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof typeof formData] !== '') {
        updatedFormData.append(key, formData[key as keyof typeof formData]);
      }
    });

    // On vérifie seulement les champs de city s'il y a quelque chose d'écrit dedans.
    if (formData.city !== '') {
      console.log(citySuggestions, formData.city);

      // Vérification que la ville entrée dans le form est bien une des propositions de l'API
      const selectedCity = citySuggestions.find(
        (city) => city.nom === updatedFormData.get('city')
      );
      if (!selectedCity) {
        setError('Veuillez sélectionner une ville valide dans la liste.');
        return;
      }
      // Ajout du département à FormData
      updatedFormData.set('department_label', selectedCity.departement.nom);
    }

    // Ajouter le fichier à FormData
    if (file) {
      updatedFormData.append('file', file);
    }

    try {
      // Appel de editUserProfile avec la copie locale de formData mise à jour
      console.log(Array.from(updatedFormData.entries()));

      const response = await editUserProfile(updatedFormData);
      console.log(response);

      if (response.error) {
        switch (response.status) {
          case 400:
            setError(`${response.error}`);
            break;
          case 409:
            setError('Conflit: mail ou numéro de téléphone déjà existant.');
            break;
          case 500:
            setError('Une erreur est survenue côté serveur.');
            break;
          default:
            setError(
              "Une erreur inconnue est survenue, contactez l'administrateur."
            );
        }
        return;
      }

      console.log('Modification de profil réussie', response);
      setError('');
      navigate(`/`);
    } catch (err) {
      console.error('Erreur lors de la modification de profil', err);
      setError("Une erreur s'est produite lors la modification du profil.");
    }
  };

  return (
    <section className="edit-container-inscription">
      <h2>Modifier mon profil</h2>
      <p>Veuillez remplir que les champs que vous souhaitez modifier!</p>
      <section>
        <form
          onSubmit={handleSubmit}
          className="edit-container-inscription-form"
        >
          <input
            type="file"
            name="file"
            accept=".jpg, .jpeg, .png"
            capture="environment"
            onChange={handleChange}
          />

          <input
            type="text"
            name="firstname"
            placeholder="Prénom"
            className="edit-container-inscription-form-input"
            value={formData.firstname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Nom"
            className="edit-container-inscription-form-input"
            value={formData.lastname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            className="edit-container-inscription-form-input"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="Ville"
            autoComplete="one-time-code"
            className="edit-container-inscription-form-input"
            value={formData.city}
            onChange={handleChange}
            list="city-suggestions"
          />
          <datalist id="city-suggestions">
            {citySuggestions.map((city) => (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <option key={city.nom} value={city.nom} />
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
            className="edit-container-inscription-form-input"
            value={formData.phone_number}
            onChange={handleChange}
          />
          <input
            type="text"
            name="password"
            placeholder="Mot de Passe"
            className="edit-container-inscription-form-input"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="text"
            name="repeatPassword"
            placeholder="Confirmation Mot de Passe"
            className="edit-container-inscription-form-input"
            value={formData.repeatPassword}
            onChange={handleChange}
          />
          {/* Espace pour message si erreur sur la page */}
          {error && <p className="error-message">{error}</p>}

          <button
            type="submit"
            className="edit-container-inscription-form-button"
          >
            Valider
          </button>
        </form>
      </section>
    </section>
  );
}

export default EditProfile;
