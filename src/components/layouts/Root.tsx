import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import '../../styles/index.scss';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchBar from '../Search/Search';

function Root() {
  // récup URL pour surveiller changement de page
  const { pathname } = useLocation();

  // remise haut de page au changement d'URL
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="page">
      <Header />
      <main className="main">
        <SearchBar />
        {/* le outlet indique l'emplacement d'affichage des routes sélectionnées */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Root;
