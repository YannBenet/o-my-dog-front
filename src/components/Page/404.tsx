import '../PageStyle/404.scss';
import errorPicture from '../../../public/images/errorPicture.jpg';
function AboutUs() {
  return (
    <div className="error">
      <img
        src={errorPicture}
        alt="crocodile avec la guele ouverte"
        className="error-picture"
      />
      <p className="error-status"> Erreur 404 Hé, c'est privé ici !</p>
    </div>
  );
}

export default AboutUs;
