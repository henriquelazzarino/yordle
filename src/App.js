import Game from "./components/Game/Game";
import "./App.css"
import Keyboard from "./components/Keyboard/Keyboard";
import Footer from "./components/Footer/Footer";

function App() {
  return <div className="App">
    <Game />
    <Keyboard />
    <Footer />
  </div>;
}

export default App;
