import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Instructions from "./pages/Instructions";
import Laskuri from "./pages/Laskuri";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/laskuri" element={<Laskuri />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
