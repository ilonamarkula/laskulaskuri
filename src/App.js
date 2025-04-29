import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Laskuri from "./pages/Laskuri";

function App() {
  return (
    <div className="app">
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
