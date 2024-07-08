import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
// import React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import des routes et composents
import Root from './components/layouts/Root';
import Home from './components/Page/Home';
import Contact from './components/Page/Contact';
import LegalInformation from './components/Page/LegalInformation';
import GeneralCondition from './components/Page/GeneralCondition';
import DataProtection from './components/Page/DataProtection';
import Inscription from './components/Page/Inscription';
import Connexion from './components/Page/Connexion';
import Search from './components/Page/Search';
import Profile from './components/Page/PersonalProfile';
import EditProfile from './components/Page/EditProfile';
import PetSitterProfile from './components/Page/PetSitterProfile';
import Availability from './components/Page/Availability';
import AboutUs from './components/Page/QuiSommeNous';
import './styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Création du "client"
const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/LegalInformation" element={<LegalInformation />} />
      <Route path="/GeneralCondition" element={<GeneralCondition />} />
      <Route path="/DataProtection" element={<DataProtection />} />
      <Route path="/Connexion" element={<Connexion />} />
      <Route path="/Inscription" element={<Inscription />} />
      {/* search à faire */}
      <Route path="/Search" element={<Search />} />
      <Route path="/profile/:id" element={<Profile />} />
      {/* EditProfile à faire */}
      <Route path="/profile/EditProfile" element={<EditProfile />} />
      {/* PetSitter/id en cours */}
      <Route path="/PetSitter/:id" element={<PetSitterProfile />} />
      {/* Availability à faire */}
      <Route path="/Availability" element={<Availability />} />
    </Route>
  )
);

// On injecte notre application dans le DOM
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
