/* eslint-disable consistent-return */
/* eslint-disable import/no-absolute-path */
import './Banner.scss';

import bannerOne from '/images/bannerOne.jpg';
import bannerTwo from '/images/bannerTwo.jpg';
import bannerThree from '/images/bannerThree.jpg';

function Banner() {
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
    </section>
  );
}

export default Banner;
