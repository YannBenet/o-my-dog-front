import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import '../../styles/index.scss';
import Footer from '../elements/Footer/Footer';
import Header from '../elements/Header/Header';

function Root() {
  // récup URL pour surveiller changement de page
  const { pathname } = useLocation();

  // remise haut de page au changement d'URL
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Ajouter le useEffect pour gérer l'événement beforeunload
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Nettoyage de l'événement lors du démontage du composant
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="page">
      <Header />
      <main className="main">
        {/* le outlet indique l'emplacement d'affichage des routes sélectionnées */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Root;
