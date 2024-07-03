import '../PageStyle/EditProfile.scss';

function EditProfil() {
  return (
    <section className="container-inscription">
      <h2>Modifier mon profil</h2>
      <section>
        <form action="submit" className="container-inscription-form">
          <input
            type="text"
            placeholder="Prénom"
            className="container-inscription-form-input"
          />
          <input
            type="text"
            placeholder="Nom"
            className="container-inscription-form-input"
          />
          <input
            type="text"
            placeholder="Numéro de Téléphone"
            className="container-inscription-form-input"
          />
          <input
            type="text"
            placeholder="ville"
            className="container-inscription-form-input"
          />
          <input
            type="text"
            placeholder="email"
            className="container-inscription-form-input"
          />
          <input
            type="text"
            placeholder="Mot de Passe"
            className="container-inscription-form-input"
          />
          <input
            type="text"
            placeholder="vérifiacation Mot de Passe"
            className="container-inscription-form-input"
          />

          <button type="submit" className="container-inscription-form-button">
            Validé
          </button>
        </form>
      </section>
    </section>
  );
}

export default EditProfil;
