/* eslint-disable react/no-unescaped-entities */

import '../../styles/index.scss';
import './Home.scss';
import SearchBar from '../elements/SearchBar/SearchBar';
import FirstSelection from '../elements/FirstSelection/FirstSelection';

import firstList from '../../data/pet-sitters';

function Home() {
  return (
    <section className="home-main">
      <SearchBar />
      <article className="narrative">
        <h1 className="narrative-title">O'My Dog</h1>
        <p className="narrative-text">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem
          perferendis error, id doloribus exercitationem tempore nemo adipisci
          aperiam ipsum ullam dolorum deleniti officia voluptate natus fugiat
          aut iste doloremque magnam ad harum esse enim impedit! Repudiandae
          nemo officiis ducimus commodi obcaecati voluptatibus beatae cumque
          adipisci inventore. Assumenda placeat quibusdam quod cumque
          exercitationem neque? Quod, ratione.
        </p>
      </article>
      <FirstSelection firstList={firstList} />
    </section>
  );
}

export default Home;
