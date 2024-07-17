/* eslint-disable react/no-unescaped-entities */

import '../../styles/index.scss';
import '../PageStyle/Home.scss';
import SearchBar from '../elements/Banner/Banner';
import FirstSelection from '../elements/FirstSelection/FirstSelection';

function Home() {
  return (
    <section className="home-main">
      <SearchBar />
      <article className="narrative">
        <h1 className="narrative-title">O'My Dog</h1>
        <p className="narrative-text">
          O'My Dog est un site gratuit, communautaire basé sur l'entraide. Vous
          pouvez vous inscrire et chercher des petsitters, près de chez vous,
          dans votre département pour garder vos animaux. Si vous êtes
          disponibles, vous pouvez aussi renseigner des périodes de
          disponibilités afin d'aider à votre tour la communauté O'MyDog !
        </p>
      </article>
      <article className="selection">
        <h3 className="selection-title">Nos Petsitters : </h3>
        <FirstSelection />
      </article>
    </section>
  );
}

export default Home;
