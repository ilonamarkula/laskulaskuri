import logo from "./laskettelija.webp";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Otsikko">LASKULASKURI</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="box-container">
          <div className="box">Box 1</div>
          <div className="box">Box 2</div>
        </div>
      </header>
    </div>
  );
}

export default App;
