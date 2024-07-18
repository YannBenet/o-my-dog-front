/* eslint-disable consistent-return */
import { useParams, NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  PetSitterResponseSchema,
  ListAnnouncementsSchema,
} from '../../schema/petSitter.schema';
import SearchBar from '../elements/Banner/Banner';
import '../PageStyle/PersonalProfile.scss';
import PhotoProfil from '../../../public/images/profil.jpg';

const API_URL = import.meta.env.VITE_REACT_APP_BACK;
// const token = localStorage.getItem('token');

const getUser = async (id: string | undefined, token: string) => {
  if (!token) {
    throw new Error('Token not found');
  }
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Données de profil non chargé');
    }
    const data = await response.json();
    const transformedData = { petSitter: data };

    return PetSitterResponseSchema.parse(transformedData); // Utilisez `parse` pour valider les données
  } catch (error) {
    console.error('Error parsing data:', error);
    throw error; // Rejette l'erreur pour que React Query la capture
  }
};
const getAnnouncement = async (id: string | undefined, token?: string) => {
  if (!token) {
    throw new Error('Token not found');
  }
  try {
    const resAnnouncement = await fetch(
      `${API_URL}/users/${id}/announcements`,
      {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      }
    );
    if (!resAnnouncement.ok) {
      throw new Error('Données des annonces non chargé');
    }
    const dataAnnouncements = await resAnnouncement.json();

    if (dataAnnouncements) {
      const transformedData = { Announcements: dataAnnouncements };

      return ListAnnouncementsSchema.parse(transformedData);
    }
  } catch (error) {
    console.error('Error parsing dataAnnouncement:', error);
  }
};
// Envoie de la requète delete à l'api
const deleteAnnouncement = async (announcementId: number, token: string) => {
  if (!token) {
    throw new Error('token not found');
  }
  try {
    const response = await fetch(`${API_URL}/announcements/${announcementId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error("Echec de la supression de l'annonce");
    }
  } catch (error) {
    console.error('Erreur lors de la suppession:', error);
    throw error;
  }
};

// formatage de la date
const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

function Profile() {
  const { id } = useParams();
  // useQuery de getUser
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user', id],
    queryFn: () =>
      id && token
        ? getUser(id, token)
        : Promise.reject(new Error('ID ou token est undefined')),
    enabled: !!id && !!token,
  });
  // stockage de l'image de profil dans localStorage
  localStorage.setItem('url_img', data?.petSitter.url_img || '');
  // useQuery de getAnnouncements
  const {
    data: dataAnnouncements,
    isLoading: isLoadingAnnouncement,
    isError: isErrorAnnouncement,
    refetch: refetchAnnouncements,
  } = useQuery({
    queryKey: ['Announcement', id, token],
    queryFn: () =>
      id && token
        ? getAnnouncement(id, token)
        : Promise.reject(new Error('ID ou token est undefined')),
    enabled: !!id && !!token,
  });
  // fonctiond de supression des annonces
  const handleDelete = async (announcementId: number) => {
    try {
      await deleteAnnouncement(announcementId, token);
      refetchAnnouncements();
    } catch (error) {
      console.log('Erreur lors de la supression:', error);
    }
  };
  // Afichage des disponibilité de l'user sur son profile
  const announcementUser = dataAnnouncements?.Announcements?.map(
    (announcement) => (
      <div className="profile-available-entrie-period" key={announcement.id}>
        <p className="profile-available-entrie-period-date profile-available-entrie-period-date-on">
          du : {formatDate(announcement.date_start)}
        </p>
        <p className="profile-available-entrie-period-date profile-available-entries-period-date-off">
          au : {formatDate(announcement.date_end)}
        </p>
        <p className="profile-available-entrie-description">
          {announcement.description}
        </p>
        <h5 className="profile-available-entrie-animals-title">
          Animaux acceptées sur cette periode:{' '}
        </h5>
        <div className="profile-available-entrie-animals">
          {announcement.animal_label?.map((animal) => (
            <p key={animal}>{animal} </p>
          ))}
        </div>
        <div className="profile-available-entrie-options">
          <button
            type="button"
            className="profile-available-entrie-options-button"
            onClick={() => handleDelete(announcement.id)}
          >
            Supprimer
          </button>
          <button
            type="button"
            className="profile-available-entrie-options-button"
          >
            Modifier
          </button>
        </div>
      </div>
    )
  );
  if (isLoading) {
    return <p>LOADING.....</p>;
  }
  if (isError) {
    return <p> Erreur de chargement Profil</p>;
  }
  if (isLoadingAnnouncement) {
    return <p>Loading Announcements....</p>;
  }
  if (isErrorAnnouncement) {
    return <p>Erreur chargements de vos annonces!</p>;
  }
  const user = data?.petSitter;
  return (
    <section className="profile">
      <SearchBar />
      <section className="profile-top">
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
              <span>numéro de téléphone :</span>
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
        <div className="profile-available-entrie-title">
          <h4>Mes Disponibilités :</h4>
        </div>
        <section className="profile-available-entrie-cards">
          <div className="profile-available-entrie-card">
            {announcementUser}
          </div>
        </section>
      </section>
    </section>
  );
}

export default Profile;
