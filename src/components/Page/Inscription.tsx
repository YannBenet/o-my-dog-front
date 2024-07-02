import './Inscription.scss';

function Inscription() {
  return (
    <section className="container-inscription">
      <h2>Inscription</h2>
      <section>
        <form action="submit" className="container-inscription-form">
          <input
            type="text"
            placeholder="ici"
            className="container-inscription-form-input"
          />
          <input
            type="text"
            placeholder="ici"
            className="container-inscription-form-input"
          />
          <input
            type="text"
            placeholder="ici"
            className="container-inscription-form-input"
          />
          <input
            type="text"
            placeholder="ici"
            className="container-inscription-form-input"
          />
          <input
            type="text"
            placeholder="ici"
            className="container-inscription-form-input"
          />
          <input
            type="text"
            placeholder="ici"
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

export default Inscription;
