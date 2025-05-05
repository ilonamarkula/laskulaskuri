import { Link } from "react-router-dom";
import { IoReturnUpBackOutline } from "react-icons/io5";

export default function About() {
  return (
    <section className="about-section">
      <div className="button-container pink left-align no-border">
        <Link to="/laskuri" className="back-home-button">
          <IoReturnUpBackOutline size={30} />
        </Link>

        <div className="white-box-title">
          <p>Meistä</p>
        </div>
        <div className="inner-box">
          <p>Hei!</p>
          <br />
          <p>Olemme Mimosa ja Ilona ja teimme tällaisen.</p>
          <br />
          <br />
          <p>Kiitos!</p>
        </div>
      </div>
    </section>
  );
}
