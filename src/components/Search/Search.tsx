import './Search.scss';
// eslint-disable-next-line import/no-absolute-path
import bannerOne from '/images/bannerOne.jpg';
import bannerTwo from '../../../public/images/bannerTwo.jpg';
import bannerThree from '../../../public/images/bannerThree.jpg';

function SearchBar() {
  return (
    <section className="search-banner">
      <img
        src={bannerOne}
        alt="bannière représantant un animal"
        className="search-banner-img"
      />
      <img
        src={bannerTwo}
        alt="bannière représantant un animal"
        className="search-banner-img"
      />
      <img
        src={bannerThree}
        alt="bannière représantant un animal"
        className="search-banner-img"
      />
    </section>
  );
}

export default SearchBar;
