import { Link } from "react-router-dom";
import laskutyyppiImage from "../laskutyyppi_transparent.png";
import Vuoret from "../mountains_transparent.png";
import { useState } from "react";

export default function Home() {
  // napit, ohjeet, meistä
  const [state, setState] = useState("napit");
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
            onClick={() => {
              setState("ohjeet");
            }}
          >
            Ohjeet
          </div>
          <div
            className="home-button"
            onClick={() => {
              setState("meistä");
            }}
          >
            Meistä
          </div>
        </div>
      )}
      {state === "ohjeet" && (
        <div className="button-container">
          <p>ohjeet</p>
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
        <div className="button-container">
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
