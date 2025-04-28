import { Link } from "react-router-dom";
import laskutyyppiImage from "../laskutyyppi_transparent.png";
import Vuoret from "../mountains_transparent.png";

export default function Home() {
  return (
    <section className="home">
      <h1 className="title">
        LASKULASKURI
        <img src={laskutyyppiImage} alt="Laskutyyppi" className="title-image" />
        <img src={Vuoret} alt="Vuoret" className="title-image2" />
      </h1>
      <div className="button-container">
        <Link to="/laskuri" className="home-button">
          Aloita budjetointi
        </Link>
        <Link to="/instructions" className="home-button">
          Ohjeet
        </Link>
        <Link to="/about" className="home-button">
          Meistä
        </Link>
      </div>
    </section>
  );
}
