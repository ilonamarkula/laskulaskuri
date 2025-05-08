import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Laskuri from "./pages/Laskuri";
import Instructions from "./pages/Instructions";
import About from "./pages/About";

function App() {
  return (
    <div className="app">
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/laskuri" element={<Laskuri />} />
          <Route path="/laskulaskuri" element={<Navigate to="/" replace />} />
          <Route path="/ohjeet" element={<Instructions />} />
          <Route path="/meista" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
