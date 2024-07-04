import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
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
      <Route path="/Search" element={<Search />} />
      <Route path="Profile" element={<Profile />} />
      <Route path="/Profile/EditProfile" element={<EditProfile />} />
      <Route path="/PetSitter" element={<PetSitterProfile />} />
      <Route path="/Availability" element={<Availability />} />
    </Route>
  )
);

// On injecte notre application dans le DOM
root.render(<RouterProvider router={router} />);
