import { Link } from "react-router-dom";
import { IoReturnUpBackOutline } from "react-icons/io5";

export default function Instructions() {
  return (
    <section className="about-section">
      <div className="button-container pink left-align no-border">
        <Link to="/laskuri" className="back-home-button">
          <IoReturnUpBackOutline size={30} />
        </Link>

        <div className="white-box-title">
          <p>Käyttöohjeet</p>
        </div>

        <div className="inner-box">
          <ul>
            <li>Syötä kaikki kulut.</li>
            <li>Lisää omat lisäkulut.</li>
            <li>Muokkaa tai poista tarvittaessa.</li>
            <li>Näe kokonaissumma.</li>
            <li>Jaa kustannukset kavereiden kesken ja seuraa budjettia.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
