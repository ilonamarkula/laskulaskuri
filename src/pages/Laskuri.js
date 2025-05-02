import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { SlMenu } from "react-icons/sl";
import { Link } from "react-router-dom";

export default function Laskuri() {
  const STORAGE_KEY = "matkanNimi";

  const [matkanNimi, setMatkanNimi] = useState("Laskettelumatka");
  const [muokkausKaynnissa, setMuokkausKaynnissa] = useState(false);
  const [tilapNimi, setTilapNimi] = useState(matkanNimi);
  const [kulutYhteensa, setKulutYhteensa] = useState(0); // Lisätty

  const [newCategory, setNewCategory] = useState("");
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

  useEffect(() => {
    const tallennettu = sessionStorage.getItem(STORAGE_KEY);
    if (tallennettu) {
      setMatkanNimi(tallennettu);
      setTilapNimi(tallennettu);
    }
  }, []);

  const kasitteleNimenSyotto = (e) => {
    if (e.key === "Enter") {
      const uusi = tilapNimi.trim() || "Laskettelumatka";
      setMatkanNimi(uusi);
      sessionStorage.setItem(STORAGE_KEY, uusi);
      setMuokkausKaynnissa(false);
    } else if (e.key === "Escape") {
      setTilapNimi(matkanNimi);
      setMuokkausKaynnissa(false);
    }
  };

  const aloitaUusiMatka = () => {
    /*setCategories(["Liikkuminen", "Ruokailu", "Majoitus", "Laskettelu"]);
    sessionStorage.removeItem(STORAGE_KEY);
    setMatkanNimi("Laskettelumatka");
    setTilapNimi("Laskettelumatka");
    setMuokkausKaynnissa(false);*/
    window.location.reload();
  };

  const addExpenseToCategory = (index) => {
    const expenseName = prompt("Anna kulun nimi:");
    if (expenseName && expenseName.trim() !== "") {
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

  return (
    <div className="home">
      <button className="hampurilaisvalikko" title="Valikko">
        <SlMenu />
      </button>

      <h1 className="title">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          LASKULASKURI
        </Link>
      </h1>

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
            <button
              onClick={() => setMuokkausKaynnissa(true)}
              className="edit-button"
              title="Muokkaa nimeä"
            >
              <FaPen style={{ marginLeft: "8px" }} />
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
      <div className="kulukategoriat">
        {categories.map((category, i) => (
          <div key={i} className="category-section">
            <h3>{category.name}</h3>
            <ul>
              {category.expenses.map((expense, j) => (
                <li key={j} className="expense-item">
                  {expense.name}
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="€"
                    value={expense.amount}
                    onChange={(e) => updateExpenseAmount(i, j, e.target.value)}
                    className="amount-input"
                  />
                </li>
              ))}
            </ul>
            <button
              className="add-expense-button"
              onClick={() => addExpenseToCategory(i)}
            >
              + Lisää kulu
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
