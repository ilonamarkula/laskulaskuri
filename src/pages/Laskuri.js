import { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';



export default function Laskuri() {
  const STORAGE_KEY = 'matkanNimi';

  const [matkanNimi, setMatkanNimi] = useState('Laskettelumatka');
  const [muokkausKaynnissa, setMuokkausKaynnissa] = useState(false);
  const [tilapNimi, setTilapNimi] = useState(matkanNimi);

  // Lue nimi sessionStoragesta kun komponentti latautuu
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

  return (
    <div className="home">
      <h1 className="title">LASKULASKURI</h1>

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
      <button className="uusimatka" 
        
      >
        + Uusi matka
      </button>
    </div>
  );
}
