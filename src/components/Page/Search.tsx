import './Search.scss';
import profil from '../../../public/images/profil.jpg';
import SearchBar from '../elements/SearchBar/SearchBar';

function Search() {
  return (
    <section>
      <SearchBar />
      <section className="search-container">
        <h3> Il y as 3 pet-sitter correspondant à votre recherche</h3>
        <section className="search-container-result">
          <article className="search-container-result-card">
            <div className="search-container-result-card-img">
              <img src={profil} alt="profil" />
            </div>
            <div className="search-container-result-card-text">
              <h4>Nom Prenom</h4>
              <h6>description</h6>
              <div className="search-container-result-card-description">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde
                  eum similique autem, quia fugit provident excepturi, sit
                  nesciunt cumque, nam quo architecto beatae quibusdam optio
                  possimus quaerat saepe voluptatum ratione debitis. Amet,
                  praesentium ad? Dolore sed adipisci expedita? Dignissimos,
                  obcaecati. Corrupti aspernatur ratione optio culpa. Qui
                  voluptatem alias esse autem?
                </p>
              </div>
              <div className="search-container-result-card-date">
                <h6>Disponibilité</h6>
                <p>du 15-07-2024 au 30-07-2024</p>
              </div>
              <button
                type="button"
                className="search-container-result-card-button"
              >
                Voir Profile
              </button>
            </div>
          </article>
          <article className="search-container-result-card">
            <div className="search-container-result-card-img">
              <img src={profil} alt="profil" />
            </div>
            <div className="search-container-result-card-text">
              <h4>Nom Prenom</h4>
              <h6>description</h6>
              <div className="search-container-result-card-description">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde
                  eum similique autem, quia fugit provident excepturi, sit
                  nesciunt cumque, nam quo architecto beatae quibusdam optio
                  possimus quaerat saepe voluptatum ratione debitis. Amet,
                  praesentium ad? Dolore sed adipisci expedita? Dignissimos,
                  obcaecati. Corrupti aspernatur ratione optio culpa. Qui
                  voluptatem alias esse autem?
                </p>
              </div>
              <div className="search-container-result-card-date">
                <h6>Disponibilité</h6>
                <p>du 15-07-2024 au 30-07-2024</p>
              </div>
              <button
                type="button"
                className="search-container-result-card-button"
              >
                Voir Profile
              </button>
            </div>
          </article>
          <article className="search-container-result-card">
            <div className="search-container-result-card-img">
              <img src={profil} alt="profil" />
            </div>
            <div className="search-container-result-card-text">
              <h4>Nom Prenom</h4>
              <h6>description</h6>
              <div className="search-container-result-card-description">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                  itaque ut a eos, assumenda quo.
                </p>
              </div>
              <div className="search-container-result-card-date">
                <h6>Disponibilité</h6>
                <p>du 15-07-2024 au 30-07-2024</p>
              </div>
              <button
                type="button"
                className="search-container-result-card-button"
              >
                Voir Profile
              </button>
            </div>
          </article>
        </section>
      </section>
    </section>
  );
}

export default Search;
