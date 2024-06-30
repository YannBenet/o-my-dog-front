import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Root from './components/layouts/Root';

import './styles/index.scss';
import Contact from './components/Page/contact';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/* ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); */

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/contact" element={<Contact />} />
    </Route>
  )
);

// On injecte notre application dans le DOM
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
