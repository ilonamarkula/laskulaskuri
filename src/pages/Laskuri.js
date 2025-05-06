import { useEffect, useRef, useState } from "react";
import { FaPen, FaInfoCircle } from "react-icons/fa";
import { SlMenu } from "react-icons/sl";
import { Link } from "react-router-dom";
import { RiCloseLargeLine } from "react-icons/ri";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { CiCircleInfo } from "react-icons/ci";

export default function Laskuri() {
  const STORAGE_KEY = "matkaData";
  const [loaded, setLoaded] = useState(false);
  const [matkanNimi, setMatkanNimi] = useState("Laskettelumatka");
  const [muokkausKaynnissa, setMuokkausKaynnissa] = useState(false);
  const [tilapNimi, setTilapNimi] = useState(matkanNimi);
  const [kulutYhteensa, setKulutYhteensa] = useState(0);
  const [valikkoAuki, setValikkoAuki] = useState(false);
  const [dropdownAuki, setDropdownAuki] = useState(false);
  const [naytaVinkki, setNaytaVinkki] = useState(false);
  const [aktiivinenVinkki, setAktiivinenVinkki] = useState("");

  const categoryTips = {
    Liikkuminen: "Suunnittele matkustus etukäteen ja vertaa eri kulkumuotojen hintoja. Yhteiskyydit tai ajoissa varatut junat/bussit voivat tuoda säästöjä!",
    Ruokailu: "Hiihtokeskuksilla ruokailu voi nopeasti kasvattaa budjettia – harkitse omia eväitä tai lounastarjouksia.",
    Majoitus: "Vertaa eri majoitusvaihtoehtoja ja jaa huone kavereiden kanssa, jos mahdollista. Varaamalla ajoissa löydät parhaat hinnat!",
    Laskettelu: "Hissiliput ja välinevuokra voivat haukata ison osan budjetista. Vertaile keskusten hintoja ja etsi etukäteistarjouksia!",
  };

  const [categories, setCategories] = useState([
    {
      name: "Liikkuminen",
      expenses: [
        { name: "Menomatka", amount: "" },
        { name: "Paluumatka", amount: "" },
      ],
    },
    {
      name: "Ruokailu",
      expenses: [
        { name: "Ravintolat", amount: "" },
        { name: "Omat eväät", amount: "" },
      ],
    },
    {
      name: "Majoitus",
      expenses: [{ name: "Hotelli", amount: "" }],
    },
    {
      name: "Laskettelu",
      expenses: [
        { name: "Hissiliput", amount: "" },
        { name: "Välinevuokra", amount: "" },
        { name: "Hiihtokoulu", amount: "" },
      ],
    },
  ]);

  const avaaVinkki = (kategoriannimi) => {
    setAktiivinenVinkki(categoryTips[kategoriannimi]);
    setNaytaVinkki(true);
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    const matkaData = localStorage.getItem(STORAGE_KEY);
    setLoaded(true);
    if (matkaData !== null) {
      const data = JSON.parse(matkaData);
      setMatkanNimi(data.matkanNimi);
      setTilapNimi(data.matkanNimi);
      setCategories(data.categories);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const matkaData = { matkanNimi, categories };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matkaData));
  }, [matkanNimi, categories]);

  useEffect(() => {
    const total = categories.reduce((sum, category) =>
      sum + category.expenses.reduce((cSum, exp) => cSum + (parseFloat(exp.amount) || 0), 0)
    , 0);
    setKulutYhteensa(total);
  }, [categories]);

  const kasitteleNimenSyotto = (e) => {
    if (e.key === "Enter") {
      const uusi = tilapNimi.trim() || "Laskettelumatka";
      setMatkanNimi(uusi);
      setMuokkausKaynnissa(false);
    } else if (e.key === "Escape") {
      setTilapNimi(matkanNimi);
      setMuokkausKaynnissa(false);
    }
  };

  const aloitaUusiMatka = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMatkanNimi("Laskettelumatka");
    setTilapNimi("Laskettelumatka");
    setMuokkausKaynnissa(false);
    setKulutYhteensa(0);
    setCategories([
      {
        name: "Liikkuminen",
        expenses: [
          { name: "Menomatka", amount: "" },
          { name: "Paluumatka", amount: "" },
        ],
      },
      {
        name: "Ruokailu",
        expenses: [
          { name: "Ravintolat", amount: "" },
          { name: "Omat eväät", amount: "" },
        ],
      },
      {
        name: "Majoitus",
        expenses: [{ name: "Hotelli", amount: "" }],
      },
      {
        name: "Laskettelu",
        expenses: [
          { name: "Hissiliput", amount: "" },
          { name: "Välinevuokra", amount: "" },
          { name: "Hiihtokoulu", amount: "" },
        ],
      },
    ]);
  };

  const addExpenseToCategory = (index) => {
    const expenseName = prompt("Anna kulun nimi:");
    if (expenseName?.trim()) {
      const updated = [...categories];
      updated[index].expenses.push({ name: expenseName.trim(), amount: "" });
      setCategories(updated);
    }
  };

  const updateExpenseAmount = (categoryIndex, expenseIndex, value) => {
    const updated = [...categories];
    updated[categoryIndex].expenses[expenseIndex].amount = value;
    setCategories(updated);
  };

  const saveAsFile = (fileType) => {
    alert(`${fileType} valittu!`);
    setDropdownAuki(false);
  };

  if (!loaded) return null;

  return (
    <div className="home">
      <button className="hampurilaisvalikko" title="Valikko" onClick={() => setValikkoAuki(!valikkoAuki)}>
        {valikkoAuki ? <RiCloseLargeLine /> : <SlMenu />}
      </button>

      {valikkoAuki && (
        <div className="valikko-laatikko slide-in">
          <Link to="/" className="valikko-linkki" onClick={() => setValikkoAuki(false)}>Etusivu</Link>
          <Link to="/ohjeet" className="valikko-linkki" onClick={() => setValikkoAuki(false)}>Ohjeet</Link>
          <Link to="/meista" className="valikko-linkki" onClick={() => setValikkoAuki(false)}>Meistä</Link>
        </div>
      )}

      <h1 className="title">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          LASKULASKURI
        </Link>
      </h1>

      <div className="dropdown-wrapper">
        <button className="save-budget-button" onClick={() => setDropdownAuki(!dropdownAuki)}>
          Tallenna budjetti {dropdownAuki ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
        </button>
        {dropdownAuki && (
          <ul className="save-dropdown-menu">
            <li onClick={() => saveAsFile("PDF")}>PDF</li>
            <li onClick={() => saveAsFile("JPEG")}>JPEG</li>
            <li onClick={() => saveAsFile("TXT")}>TXT</li>
          </ul>
        )}
      </div>

      <div style={{ marginBottom: "30px" }}>
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
            <button onClick={() => setMuokkausKaynnissa(true)} className="edit-button" title="Muokkaa nimeä">
              <FaPen style={{ marginLeft: "8px" }} />
            </button>
          </h2>
        )}
      </div>

      <button className="uusimatka" onClick={aloitaUusiMatka}>+ Uusi matka</button>

      <div className="kulut-boksi">
        <div className="kulut-otsikko">Kulut yht.</div>
        <div className="kulut-summa">{kulutYhteensa} €</div>
      </div>

      <div className="kulukategoriat">
        {categories.map((category, i) => (
          <div key={i} className="category-section">
            <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {category.name}
              <button
                className="info-button"
                onClick={() => avaaVinkki(category.name)}
                title="Näytä vinkki"
                style={{ background: "none", border: "none", cursor: "pointer", color: "#555" }}
              >
                <CiCircleInfo  />
              </button>
            </h3>
            <ul>
              {category.expenses.map((expense, j) => (
                <li key={j} className="expense-item">
                  {expense.name}
                  <input
                    type="number"
                    min="0"
                    step="5"
                    placeholder="€"
                    value={expense.amount}
                    onChange={(e) => updateExpenseAmount(i, j, e.target.value)}
                    className="amount-input"
                  />
                </li>
              ))}
            </ul>
            <button className="add-expense-button" onClick={() => addExpenseToCategory(i)}>
              + Lisää kulu
            </button>
          </div>
        ))}
      </div>

      {naytaVinkki && (
        <div
          className="vinkkipopup"
          style={{
            position: "fixed",
            top: 0, left: 0, width: "100vw", height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
            justifyContent: "center", alignItems: "center", zIndex: 9999
          }}
          onClick={() => setNaytaVinkki(false)}
        >
          <div
            style={{
              background: "white", padding: "20px", borderRadius: "12px",
              maxWidth: "400px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p style={{ marginBottom: "15px" }}>{aktiivinenVinkki}</p>
            <button onClick={() => setNaytaVinkki(false)}>Sulje</button>
          </div>
        </div>
      )}
    </div>
  );
}
