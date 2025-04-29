import { Link } from "react-router-dom";
import laskutyyppiImage from "../laskutyyppi_transparent.png";
import Vuoret from "../mountains_transparent.png";
import { useState } from "react";

export default function Home() {
  // napit, ohjeet, meistä
  const [state, setState] = useState("napit");
  const handleButtonClick = (page) => {
    setState(page);
  };
  return (
    <section className="home">
      <h1 className="title">
        LASKULASKURI
        <img src={laskutyyppiImage} alt="Laskutyyppi" className="title-image" />
        <img src={Vuoret} alt="Vuoret" className="title-image2" />
      </h1>
      {state === "napit" && (
        <div className="button-container">
          <Link to="/laskuri" className="home-button">
            Aloita budjetointi
          </Link>
          <div
            className="home-button"
            onClick={() => handleButtonClick("ohjeet")}
          >
            Ohjeet
          </div>
          <div
            className="home-button"
            onClick={() => handleButtonClick("meistä")}
          >
            Meistä
          </div>
        </div>
      )}
      {state === "ohjeet" && (
        <div className="button-container pink">
          <h2>Käyttöohjeet</h2>
          <ul>
            <li>Valitse "Aloita budjetointi"</li>
            <li>Syötä kulut</li>
            <li>Lisää omat lisäkulut</li>
            <li>Muokkaa tai poista kuluja tarvittaessa</li>
            <li>Seuraa budjettia ja jaa kustannukset kavereiden kesken</li>
            <li>Näet tuloksen lopuksi</li>
          </ul>
          <div
            onClick={() => {
              setState("napit");
            }}
          >
            X
          </div>
        </div>
      )}
      {state === "meistä" && (
        <div className="button-container pink">
          <p>meistä</p>
          <div
            onClick={() => {
              setState("napit");
            }}
          >
            X
          </div>
        </div>
      )}
    </section>
  );
}
