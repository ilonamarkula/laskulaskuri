import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Laskuri from "./pages/Laskuri";
import Instructions from "./pages/Instructions"; // ← korjattu nimi
import About from "./pages/About"; // ← korjattu nimi

function App() {
  return (
    <div className="app">
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/laskuri" element={<Laskuri />} />
          <Route path="/ohjeet" element={<Instructions />} /> {/* pysyy suomenkielisenä URL:ssa */}
          <Route path="/meista" element={<About />} /> {/* pysyy suomenkielisenä URL:ssa */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
