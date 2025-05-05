import { Link } from "react-router-dom";
import { SlClose } from "react-icons/sl";
import laskutyyppiImage from "../laskutyyppi_transparent.png";
import Vuoret from "../mountains_transparent.png";
import { useState } from "react";

export default function Home() {
  // napit, ohjeet, meistä
  const [state, setState] = useState("napit");
  const handleButtonClick = (page) => setState(page);

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
            Budjetointiin
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
        <div className="button-container pink left-align">
          <Link
            to="/"
            className="back-home-button"
            onClick={() => setState("napit")}
          >
            <SlClose size={30} />
          </Link>

          <div className="white-box-title">
            <p>Käyttöohjeet</p>
          </div>
          <div className="inner-box">
            <li>Valitse "Aloita budjetointi"</li>
            <li>Syötä kulut</li>
            <li>Lisää omat lisäkulut</li>
            <li>Muokkaa tai poista kuluja tarvittaessa</li>
            <li>Seuraa budjettia ja jaa kustannukset kavereiden kesken</li>
            <li>Näet tuloksen lopuksi</li>
          </div>
        </div>
      )}

      {state === "meistä" && (
        <div className="button-container pink left-align">
          <Link
            to="/"
            className="back-home-button"
            onClick={() => setState("napit")}
          >
            <SlClose size={30} />
          </Link>

          <div className="white-box-title">
            <p>Meistä</p>
          </div>
          <div className="inner-box">
            <p>Hei!</p>
            <br />
            <p>Olemme Mimosa ja Ilona ja teimme tällaisen.</p>
            <br />
            <p>Kiitos!</p>
          </div>
        </div>
      )}
    </section>
  );
}
