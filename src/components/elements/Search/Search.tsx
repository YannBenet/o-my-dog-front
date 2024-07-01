/* eslint-disable import/no-absolute-path */
import './Search.scss';

import bannerOne from '/images/bannerOne.jpg';
import bannerTwo from '/images/bannerTwo.jpg';
import bannerThree from '/images/bannerThree.jpg';

function SearchBar() {
  return (
    <section className="search-banner">
      <section className="search-banner-img">
        <img
          src={bannerOne}
          alt="bannière représantant un animal"
          className="search-banner-img-solo"
        />
        <img
          src={bannerTwo}
          alt="bannière représantant un animal"
          className="search-banner-img-solo"
        />
        <img
          src={bannerThree}
          alt="bannière représantant un animal"
          className="search-banner-img-solo"
        />
      </section>
      <section className="search-banner-form-position">
        <form action="submit" className="search-banner-form">
          <input
            type="text"
            className="search-banner-form-input"
            placeholder="Lieu (département, ville)"
          />
          <input
            type="text"
            className="search-banner-form-input"
            placeholder="date"
          />
          <input
            type="text"
            className="search-banner-form-input"
            placeholder="animaux"
          />
          <button type="submit" className="search-banner-form-button">
            Validé
          </button>
        </form>
      </section>
    </section>
  );
}

export default SearchBar;
