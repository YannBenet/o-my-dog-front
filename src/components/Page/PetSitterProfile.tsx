/* eslint-disable import/no-absolute-path */
import './PersonalProfile.scss';
import PhotoProfil from '/images/profil.jpg';

function PetSitterProfile() {
  return (
    <section className="profile">
      <h2 className="profile-selected">Profil Selectionné</h2>
      <section className="profile-container">
        <img
          src={PhotoProfil}
          alt="profil"
          className="profile-container-photo"
        />

        <div className="profile-container-info">
          <p className="profile-container-info-contact">Pour le contacter</p>
          <h2>Nom: ....... Prenom: .....</h2>
          <p>numéro de téléphone: ....</p>
          <p>adresse mail: ....</p>
        </div>
      </section>
      <section className="profile-available">
        <div className="profile-available-description">
          <h3>Sa description</h3>
          <div className="profile-available-description-text">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium illo obcaecati itaque pariatur sint labore est nisi!
              Vel illum reiciendis repellendus incidunt aspernatur animi quasi,
              excepturi velit! Mollitia, officiis asperiores corrupti voluptate
              consectetur totam hic ipsam, architecto quod, dicta explicabo.
              Provident possimus quae rem. Natus optio, beatae culpa dicta
              magnam in velit laborum? Debitis, cum est ut adipisci tempore
              aliquam praesentium tenetur laboriosam nisi molestias illum porro
              vel numquam impedit placeat aliquid mollitia optio, at a deserunt
              reprehenderit ducimus. In illum expedita ipsum tempora, ut,
              inventore ratione libero laudantium, perspiciatis voluptates
              beatae dolor. Fugiat nisi ratione quisquam quidem dolore vitae rem
              voluptate maxime assumenda excepturi reiciendis optio quis ipsum
              maiores, laboriosam ut debitis, deleniti amet? Facilis earum quasi
              velit rem praesentium architecto facere laudantium nulla corrupti.
              Explicabo voluptatum labore ipsum quia, porro quo distinctio fugit
              aspernatur, quod est tenetur maxime, autem adipisci. Facilis, et
              velit amet cum nulla ducimus itaque!
            </p>
          </div>
        </div>
        <section className="profile-available-entrie">
          <div className="profile-available-entrie-title">
            <h4>Ses Disponibilitées :</h4>
          </div>
          <div className="profile-available-entrie-period">
            <p className="profile-available-entrie-period-date profile-available-entrie-period-date-on">
              du: 10/07/2024
            </p>
            <p className="profile-available-entrie-period-date profile-available-entrie-period-date-off">
              au: 10/07/2024
            </p>
          </div>
          <div className="profile-available-entrie-period">
            <p className="profile-available-entrie-period-date profile-available-entrie-period-date-on">
              du: 10/07/2024
            </p>
            <p className="profile-available-entrie-period-date profile-available-entrie-period-date-off">
              au: 10/07/2024
            </p>
          </div>
          <div className="profile-available-entrie-period">
            <p className="profile-available-entrie-period-date profile-available-entrie-period-date-on">
              du: 10/07/2024
            </p>
            <p className="profile-available-entrie-period-date profile-available-entries-period-date-off">
              au: 10/07/2024
            </p>
          </div>
        </section>
      </section>
    </section>
  );
}

export default PetSitterProfile;
