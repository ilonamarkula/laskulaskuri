import { useEffect, useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import { SlMenu } from "react-icons/sl";
import { Link } from "react-router-dom";
import { RiCloseLargeLine } from "react-icons/ri";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { GoQuestion } from "react-icons/go";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
  const [showKulutBoksi, setShowKulutBoksi] = useState(true);
  const allExpensesRef = useRef(null);

  const categoryTips = {
    Liikkuminen:
      "Suunnittele matkustus etukäteen ja vertaa eri kulkumuotojen hintoja. Yhteiskyydit tai ajoissa varatut junat/bussit voivat tuoda säästöjä!",
    Ruokailu:
      "Hiihtokeskuksilla ruokailu voi nopeasti kasvattaa budjettia – harkitse omia eväitä tai lounastarjouksia.",
    Majoitus:
      "Vertaa eri majoitusvaihtoehtoja ja jaa huone kavereiden kanssa, jos mahdollista. Varaamalla ajoissa löydät parhaat hinnat!",
    Laskettelu:
      "Hissiliput ja välinevuokra voivat haukata ison osan budjetista. Vertaile keskusten hintoja ja etsi etukäteistarjouksia!",
  };

  const categoryTitles = {
    Ruokailu: "Ruokailu laskettelemassa",
    Majoitus: "Majoittuminen kohteessa",
    Liikkuminen: "Liikkuminen",
    Laskettelu: "Ota huomioon laskettelussa",
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

  const [vinkinOtsikko, setVinkinOtsikko] = useState("");

  const avaaVinkki = (kategoriannimi) => {
    setAktiivinenVinkki(categoryTips[kategoriannimi]);
    setVinkinOtsikko(categoryTitles[kategoriannimi] || kategoriannimi);
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
    const total = categories.reduce(
      (sum, category) =>
        sum +
        category.expenses.reduce(
          (cSum, exp) => cSum + (parseFloat(exp.amount) || 0),
          0
        ),
      0
    );
    setKulutYhteensa(total);
  }, [categories]);

  useEffect(() => {
    const handleScroll = () => {
      if (allExpensesRef.current) {
        const rect = allExpensesRef.current.getBoundingClientRect();
        // Jos all-expenses-box on näkyvissä (top < window height)
        setShowKulutBoksi(rect.top > window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    const updatedCategories = [...categories];
    updatedCategories[index].expenses.push({
      name: "",
      amount: "",
      isEditing: true,
    });
    setCategories(updatedCategories);
  };

  const handleExpenseNameChange = (categoryIndex, expenseIndex, value) => {
    const updated = [...categories];
    updated[categoryIndex].expenses[expenseIndex].name = value;
    setCategories(updated);
  };

  const handleExpenseAmountChange = (categoryIndex, expenseIndex, value) => {
    const updated = [...categories];
    updated[categoryIndex].expenses[expenseIndex].amount = value;
    setCategories(updated);
  };

  const toggleExpenseEdit = (categoryIndex, expenseIndex, editing) => {
    const updated = [...categories];
    updated[categoryIndex].expenses[expenseIndex].isEditing = editing;
    setCategories(updated);
  };

  const handleExpenseNameBlur = (categoryIndex, expenseIndex) => {
    const expense = categories[categoryIndex].expenses[expenseIndex];
    if (expense.name.trim() === "") {
      expense.name = "Uusi kulu";
    }
    toggleExpenseEdit(categoryIndex, expenseIndex, false);
  };

  const handleExpenseNameKeyDown = (e, categoryIndex, expenseIndex) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleExpenseNameBlur(categoryIndex, expenseIndex);
    }
  };

  // Päivitetään yksittäisen kulun summa
  const updateExpenseAmount = (categoryIndex, expenseIndex, value, event) => {
    handleExpenseAmountChange(categoryIndex, expenseIndex, value);

    if (event.key === "Enter") {
      let nextCategoryIndex = categoryIndex;
      let nextExpenseIndex = expenseIndex + 1;

      const updatedCategories = [...categories];

      // Jos kululista loppuu, siirrytään seuraavaan kategoriaan
      if (
        nextExpenseIndex >= updatedCategories[categoryIndex].expenses.length
      ) {
        nextCategoryIndex = categoryIndex + 1;
        nextExpenseIndex = 0; // Aloita seuraavasta kategoriasta ensimmäinen kulu
      }

      // Tarkista että seuraava kategoria on olemassa
      if (
        updatedCategories[nextCategoryIndex] &&
        updatedCategories[nextCategoryIndex].expenses[nextExpenseIndex]
      ) {
        const nextExpenseElement = document.getElementById(
          `expense-input-${nextCategoryIndex}-${nextExpenseIndex}`
        );
        if (nextExpenseElement) {
          nextExpenseElement.focus();
        }
      }
    }
  };

  const saveAsFile = async (fileType) => {
    const content = document.querySelector(".kulukategoriat");

    switch (fileType) {
      case "PDF":
        try {
          const canvas = await html2canvas(content);
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = canvas.width;
          const imgHeight = canvas.height;
          const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
          const imgX = (pdfWidth - imgWidth * ratio) / 2;
          const imgY = 30;

          pdf.addImage(
            imgData,
            "PNG",
            imgX,
            imgY,
            imgWidth * ratio,
            imgHeight * ratio
          );
          pdf.save(`${matkanNimi}-budjetti.pdf`);
        } catch (error) {
          console.error("Virhe PDF:n luonnissa:", error);
          alert("PDF:n tallentaminen epäonnistui");
        }
        break;

      case "JPEG":
        try {
          const canvas = await html2canvas(content);
          const link = document.createElement("a");
          link.download = `${matkanNimi}-budjetti.jpg`;
          link.href = canvas.toDataURL("image/jpeg", 1.0);
          link.click();
        } catch (error) {
          console.error("Virhe JPEG:n luonnissa:", error);
          alert("JPEG:n tallentaminen epäonnistui");
        }
        break;

      case "TXT":
        try {
          let textContent = `${matkanNimi} - Budjetti\n\n`;
          textContent += `Kulut yhteensä: ${kulutYhteensa} €\n\n`;

          categories.forEach((category) => {
            textContent += `${category.name}:\n`;
            category.expenses.forEach((expense) => {
              if (expense.amount) {
                textContent += `- ${expense.name}: ${expense.amount} €\n`;
              }
            });
            textContent += "\n";
          });

          const blob = new Blob([textContent], { type: "text/plain" });
          const link = document.createElement("a");
          link.download = `${matkanNimi}-budjetti.txt`;
          link.href = URL.createObjectURL(blob);
          link.click();
          URL.revokeObjectURL(link.href);
        } catch (error) {
          console.error("Virhe TXT:n luonnissa:", error);
          alert("TXT:n tallentaminen epäonnistui");
        }
        break;
    }

    setDropdownAuki(false);
  };

  if (!loaded) return null;

  return (
    <div className="home">
      <button
        className="hampurilaisvalikko"
        title="Valikko"
        onClick={() => setValikkoAuki(!valikkoAuki)}
      >
        {valikkoAuki ? <RiCloseLargeLine /> : <SlMenu />}
      </button>

      {valikkoAuki && (
        <div className="valikko-laatikko slide-in">
          <Link
            to="/"
            className="valikko-linkki"
            onClick={() => setValikkoAuki(false)}
          >
            Etusivu
          </Link>
          <Link
            to="/ohjeet"
            className="valikko-linkki"
            onClick={() => setValikkoAuki(false)}
          >
            Ohjeet
          </Link>
          <Link
            to="/meista"
            className="valikko-linkki"
            onClick={() => setValikkoAuki(false)}
          >
            Meistä
          </Link>
        </div>
      )}

      <h1 className="title">
        <Link to="/">LASKULASKURI</Link>
      </h1>

      <div className="dropdown-wrapper">
        <button
          className="save-budget-button"
          onClick={() => setDropdownAuki(!dropdownAuki)}
        >
          Tallenna budjetti{" "}
          {dropdownAuki ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
        </button>
        {dropdownAuki && (
          <ul className="save-dropdown-menu">
            <li onClick={() => saveAsFile("PDF")}>PDF</li>
            <li onClick={() => saveAsFile("JPEG")}>JPEG</li>
            <li onClick={() => saveAsFile("TXT")}>TXT</li>
          </ul>
        )}
      </div>

      <div className="trip-name-wrapper">
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
      {showKulutBoksi && (
        <div className="kulut-boksi">
          <div className="kulut-otsikko">Kulut yht.</div>
          <div className="kulut-summa">{kulutYhteensa} €</div>
        </div>
      )}
      <div className="kulukategoriat">
        {categories.map((category, i) => (
          <div key={i} className="category-section">
            <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {category.name}
              <button
                className="info-button vinkki-nappi"
                onClick={() => avaaVinkki(category.name)}
                title="Näytä vinkki"
              >
                <GoQuestion />
              </button>
            </h3>
            <ul>
              {category.expenses.map((expense, j) => (
                <li key={j} className="expense-item">
                  {expense.isEditing ? (
                    <input
                      type="text"
                      value={expense.name}
                      onChange={(e) =>
                        handleExpenseNameChange(i, j, e.target.value)
                      }
                      onBlur={() => handleExpenseNameBlur(i, j)}
                      onKeyDown={(e) => handleExpenseNameKeyDown(e, i, j)}
                      className="expense-name-input"
                      autoFocus
                    />
                  ) : (
                    <span
                      className="expense-name-text"
                      onClick={() => toggleExpenseEdit(i, j, true)}
                      style={{ cursor: "pointer" }}
                    >
                      {expense.name}
                    </span>
                  )}
                  <input
                    type="number"
                    min="0"
                    step="5"
                    placeholder="€"
                    value={expense.amount}
                    onChange={(e) =>
                      updateExpenseAmount(i, j, e.target.value, e)
                    }
                    onKeyDown={(e) =>
                      updateExpenseAmount(i, j, e.target.value, e)
                    }
                    className="amount-input"
                    id={`expense-input-${i}-${j}`}
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
      <div className="all-expenses-box" ref={allExpensesRef}>
        <h3 className="all-expenses-title">Kaikki kulut yhteensä</h3>
        <div className="all-expenses-summary">
          <div className="expense-item all-expenses-total">
            {categories.reduce((total, category) => {
              const categoryTotal = category.expenses.reduce(
                (sum, expense) => sum + (parseFloat(expense.amount) || 0),
                0
              );
              return total + categoryTotal;
            }, 0)}{" "}
            €
          </div>
          {categories.map((category, i) => {
            const categoryTotal = category.expenses.reduce(
              (sum, expense) => sum + (parseFloat(expense.amount) || 0),
              0
            );
            return (
              <div className="expense-item" key={i}>
                {category.name}: {categoryTotal} €
              </div>
            );
          })}
        </div>
      </div>

      {naytaVinkki && (
        <div className="vinkkipopup" onClick={() => setNaytaVinkki(false)}>
          <div
            className="vinkkipopup-laatikko"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="vinkkipopup-otsikko">{vinkinOtsikko}</h3>
            <p className="vinkkiteksti">{aktiivinenVinkki}</p>
            <div style={{ marginTop: "1rem", textAlign: "right" }}>
              <button onClick={() => setNaytaVinkki(false)}>Sulje</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
