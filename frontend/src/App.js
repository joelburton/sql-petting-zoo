import "./App.css";
import { BrowserRouter } from "react-router-dom";
import PettingZoo from "./PettingZoo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PettingZoo />
      </BrowserRouter>
    </div>
  );
}

export default App;
