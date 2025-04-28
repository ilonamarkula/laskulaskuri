import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="home">
      <h1 className="title">LASKULASKURI</h1>
      <div className="button-container">
        <Link to="/" className="home-button">
          Aloita budjetointi
        </Link>
        <Link to="/about" className="home-button">
          Ohjeet
        </Link>
        <Link to="/instructions" className="home-button">
          Meistä
        </Link>
      </div>
    </section>
  );
}
