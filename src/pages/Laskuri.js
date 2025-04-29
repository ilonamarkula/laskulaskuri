import { useState } from 'react';

export default function Laskuri() {
  const [matkanNimi, setMatkanNimi] = useState('Laskettelumatka');
  const [muokkausKaynnissa, setMuokkausKaynnissa] = useState(false);
  const [tilapNimi, setTilapNimi] = useState(matkanNimi);

  const kasitteleNimenSyotto = (e) => {
    if (e.key === 'Enter') {
      setMatkanNimi(tilapNimi.trim() || 'Laskettelumatka');
      setMuokkausKaynnissa(false);
    } else if (e.key === 'Escape') {
      setTilapNimi(matkanNimi);
      setMuokkausKaynnissa(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 className="title">LASKULASKURI</h1>

      <div style={{ marginBottom: '30px' }}>
        {muokkausKaynnissa ? (
          <input
            type="text"
            value={tilapNimi}
            onChange={(e) => setTilapNimi(e.target.value)}
            onKeyDown={kasitteleNimenSyotto}
            autoFocus
            style={{
              fontSize: '24px',
              textAlign: 'center',
              border: 'none',
              borderBottom: '2px solid black',
              outline: 'none',
              width: '250px',
            }}
          />
        ) : (
          <h2
            style={{
              display: 'inline-block',
              borderBottom: '2px solid black',
              paddingBottom: '4px',
              marginBottom: '0',
              fontSize: '24px',
            }}
          >
            {matkanNimi}{' '}
            <button
              onClick={() => setMuokkausKaynnissa(true)}
              style={{
                marginLeft: '8px',
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
                fontSize: '18px',
              }}
              title="Muokkaa nimeä"
            >
              🖉
            </button>
          </h2>
        )}
      </div>

      {/* Loppulaskuri tulee tähän */}
    </div>
  );
}
