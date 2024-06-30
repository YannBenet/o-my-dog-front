import '../../styles/index.scss';
import SearchBar from '../elements/Search/Search';
import FirstSearch from '../elements/FirstSearch/FirstSearch';

function Home() {
  return (
    <section className="home-main">
      <SearchBar />
      <FirstSearch />
    </section>
  );
}

export default Home;
