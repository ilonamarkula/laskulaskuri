import { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { SlMenu } from 'react-icons/sl';
import { Link } from 'react-router-dom';

export default function Laskuri() {
  const STORAGE_KEY = 'matkanNimi';

  const [matkanNimi, setMatkanNimi] = useState('Laskettelumatka');
  const [muokkausKaynnissa, setMuokkausKaynnissa] = useState(false);
  const [tilapNimi, setTilapNimi] = useState(matkanNimi);
  const [kulutYhteensa, setKulutYhteensa] = useState(0); // Lisätty

  useEffect(() => {
    const tallennettu = sessionStorage.getItem(STORAGE_KEY);
    if (tallennettu) {
      setMatkanNimi(tallennettu);
      setTilapNimi(tallennettu);
    }
  }, []);

  const kasitteleNimenSyotto = (e) => {
    if (e.key === 'Enter') {
      const uusi = tilapNimi.trim() || 'Laskettelumatka';
      setMatkanNimi(uusi);
      sessionStorage.setItem(STORAGE_KEY, uusi);
      setMuokkausKaynnissa(false);
    } else if (e.key === 'Escape') {
      setTilapNimi(matkanNimi);
      setMuokkausKaynnissa(false);
    }
  };

  const aloitaUusiMatka = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setMatkanNimi('Laskettelumatka');
    setTilapNimi('Laskettelumatka');
    setMuokkausKaynnissa(false);
    setKulutYhteensa(0); // Resetoi kulut myös
  };

  return (
    <div className="home">
      <button className="hampurilaisvalikko" title="Valikko">
        <SlMenu />
      </button>

      <h1 className="title">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          LASKULASKURI
        </Link>
      </h1>

      <div style={{ marginBottom: '30px' }}>
        {muokkausKaynnissa ? (
          <input
            className="trip-name input"
            type="text"
            value={tilapNimi}
            onChange={(e) => setTilapNimi(e.target.value)}
            onKeyDown={kasitteleNimenSyotto}
            autoFocus
          />
        ) : (
          <h2 className="trip-name">
            {matkanNimi}
            <button
              onClick={() => setMuokkausKaynnissa(true)}
              className="edit-button"
              title="Muokkaa nimeä"
            >
              <FaPen style={{ marginLeft: '8px' }} />
            </button>
          </h2>
        )}
      </div>

      <button className="uusimatka" onClick={aloitaUusiMatka}>
        + Uusi matka
      </button>

      {/* Kulut-boksi */}
      <div className="kulut-boksi">
        <div className="kulut-otsikko">Kulut yht.</div>
        <div className="kulut-summa">{kulutYhteensa} €</div>
      </div>
    </div>
  );
}
